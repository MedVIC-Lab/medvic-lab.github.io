import type { Application as SplineApplication, SPEObject } from '@splinetool/runtime'
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'

const SPLINE_SCENE_URL = 'https://prod.spline.design/JKPplNuNtgFGliFi/scene.splinecode'
const ROOT_OBJECT_NAME = 'Root'
const BASE_ROTATION_SPEED = 0.00032
const MAX_MOUSE_ROTATION_SPEED = BASE_ROTATION_SPEED * 14
const MOUSE_POSITION_EASING = 0.46
const SPLINE_CENTER_DEAD_ZONE = 0.08
const SPLINE_INFLUENCE_RADIUS_RATIO = 0.54
const MAX_ROOT_TILT_RADIANS = 0.14
const ROOT_TILT_EASING = 0.12
const DELAY_OFFSET_MS = 64
const TINT_TARGET_SELECTOR = [
  '.medvic-impact-bar',
  '.medvic-theme-card',
  '.medvic-tool-card',
  '.medvic-cta-strip',
].join(',')
const TINT_CLIP_ID = 'medvic-spline-tint-clip'
const SVG_NS = 'http://www.w3.org/2000/svg'

type RuntimePlane = SPEObject & {
  children?: RuntimePlane[]
  parentUuid?: string
}

type SplineScene = {
  app: SplineApplication
  initialRootRotationZ: number
  initialRotations: number[]
  planes: RuntimePlane[]
  root?: RuntimePlane
}

type RotationSample = {
  rotation: number
  time: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function isPlaneObject(object: RuntimePlane) {
  return /^Plane(?:\d+)?$/.test(object.name)
}

function getPlaneSortValue(name: string) {
  if (name === 'Plane001') return 0
  if (name === 'Plane') return 1

  const match = name.match(/^Plane(\d+)$/)

  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

function sortPlanes(planes: RuntimePlane[]) {
  return [...planes].sort((a, b) => {
    const sortDelta = getPlaneSortValue(a.name) - getPlaneSortValue(b.name)

    return sortDelta || a.name.localeCompare(b.name)
  })
}

function getPlaneObjects(app: SplineApplication, root?: RuntimePlane) {
  const directChildren = root?.children?.filter(isPlaneObject) ?? []

  if (directChildren.length > 0) {
    return sortPlanes(directChildren)
  }

  const objects = app.getAllObjects() as RuntimePlane[]
  const rootChildren = root
    ? objects.filter((object) => object.parentUuid === root.uuid && isPlaneObject(object))
    : []

  if (rootChildren.length > 0) {
    return sortPlanes(rootChildren)
  }

  return sortPlanes(objects.filter(isPlaneObject))
}

function getDelayedRotation(rotationHistory: RotationSample[], targetTime: number) {
  if (rotationHistory.length === 0) return 0

  const firstSample = rotationHistory[0]
  const lastSample = rotationHistory[rotationHistory.length - 1]

  if (targetTime <= firstSample.time) return firstSample.rotation
  if (targetTime >= lastSample.time) return lastSample.rotation

  for (let index = 1; index < rotationHistory.length; index += 1) {
    const sample = rotationHistory[index]

    if (sample.time < targetTime) continue

    const previousSample = rotationHistory[index - 1]
    const sampleDuration = sample.time - previousSample.time
    const progress = sampleDuration > 0 ? (targetTime - previousSample.time) / sampleDuration : 0

    return previousSample.rotation + (sample.rotation - previousSample.rotation) * progress
  }

  return lastSample.rotation
}

export default defineComponent({
  name: 'SplineBackground',
  setup() {
    const baseStage = ref<HTMLDivElement | null>(null)
    const baseCanvas = ref<HTMLCanvasElement | null>(null)
    const tintCanvas = ref<HTMLCanvasElement | null>(null)
    const tintClipPath = ref<SVGClipPathElement | null>(null)
    let apps: SplineApplication[] = []
    let animationFrameId = 0
    let disposed = false
    let targetRootTilt = 0
    let targetRotationSpeed = 0

    function handleMouseMove(event: MouseEvent) {
      const viewportWidth = Math.max(window.innerWidth || document.documentElement.clientWidth || 1, 1)
      const stageRect = baseStage.value?.getBoundingClientRect()
      const splineCenterX = stageRect ? stageRect.left + stageRect.width / 2 : viewportWidth / 2
      const influenceRadius = Math.max(160, viewportWidth * SPLINE_INFLUENCE_RADIUS_RATIO)
      const mouseFromSplineCenter = clamp((event.clientX - splineCenterX) / influenceRadius, -1, 1)
      const distanceFromSplineCenter = Math.abs(mouseFromSplineCenter)

      if (distanceFromSplineCenter < SPLINE_CENTER_DEAD_ZONE) {
        targetRootTilt = 0
        targetRotationSpeed = 0
        return
      }

      const normalizedDistance = (distanceFromSplineCenter - SPLINE_CENTER_DEAD_ZONE) / (1 - SPLINE_CENTER_DEAD_ZONE)
      const directionalIntensity = Math.sign(mouseFromSplineCenter) * normalizedDistance

      targetRootTilt = directionalIntensity * MAX_ROOT_TILT_RADIANS
      targetRotationSpeed = directionalIntensity * MAX_MOUSE_ROTATION_SPEED
    }

    function resetMouseMotion() {
      targetRootTilt = 0
      targetRotationSpeed = 0
    }

    function stopAnimation() {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
        animationFrameId = 0
      }
    }

    function updateTintRects() {
      if (typeof window === 'undefined') return

      const clipPath = tintClipPath.value

      if (!clipPath) return

      const nextRects = Array.from(document.querySelectorAll<HTMLElement>(TINT_TARGET_SELECTOR))
        .map((element) => {
          const rect = element.getBoundingClientRect()
          const styles = window.getComputedStyle(element)
          const radius = Number.parseFloat(styles.borderTopLeftRadius) || 8

          return {
            height: Math.max(0, rect.height),
            radius,
            width: Math.max(0, rect.width),
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
          }
        })
        .filter((rect) => Boolean(rect && rect.width > 0 && rect.height > 0))

      while (clipPath.childNodes.length > nextRects.length) {
        clipPath.removeChild(clipPath.lastChild as ChildNode)
      }

      nextRects.forEach((rect, index) => {
        if (!rect) return

        let svgRect = clipPath.children.item(index) as SVGRectElement | null

        if (!svgRect) {
          svgRect = document.createElementNS(SVG_NS, 'rect')
          clipPath.appendChild(svgRect)
        }

        svgRect.setAttribute('height', String(rect.height))
        svgRect.setAttribute('rx', String(rect.radius))
        svgRect.setAttribute('ry', String(rect.radius))
        svgRect.setAttribute('width', String(rect.width))
        svgRect.setAttribute('x', String(rect.x))
        svgRect.setAttribute('y', String(rect.y))
      })
    }

    async function loadSplineScene(Application: typeof import('@splinetool/runtime').Application, canvas: HTMLCanvasElement) {
      const app = new Application(canvas, { renderMode: 'continuous' })

      apps.push(app)
      await app.load(SPLINE_SCENE_URL)
      app.setBackgroundColor('rgba(0, 0, 0, 0)')

      const root = app.findObjectByName(ROOT_OBJECT_NAME) as RuntimePlane | undefined

      if (!root) {
        console.warn(`[MedVIC Spline] Could not find the '${ROOT_OBJECT_NAME}' object in the scene.`)
      }

      const planes = getPlaneObjects(app, root)
      const initialRootRotationZ = root?.rotation.z ?? 0
      const initialRotations = planes.map((plane) => plane.rotation.y)

      if (planes.length === 0) {
        console.warn('[MedVIC Spline] No Plane objects were found for the windchime rotation.')
      }

      return {
        app,
        initialRootRotationZ,
        initialRotations,
        planes,
        root,
      }
    }

    onMounted(async () => {
      if (!baseCanvas.value || !tintCanvas.value) return

      const { Application } = await import('@splinetool/runtime')

      if (disposed || !baseCanvas.value || !tintCanvas.value) return

      let scenes: SplineScene[]

      try {
        scenes = await Promise.all([
          loadSplineScene(Application, baseCanvas.value),
          loadSplineScene(Application, tintCanvas.value),
        ])
      } catch (error) {
        console.warn('[MedVIC Spline] Could not load the Spline scene.', error)
        return
      }

      if (disposed || scenes.length === 0) return

      const maxDelayMs = scenes.reduce(
        (largestDelay, scene) => Math.max(largestDelay, Math.max(0, scene.planes.length - 1) * DELAY_OFFSET_MS),
        0,
      )
      const rotationHistory: RotationSample[] = []
      let driverRotation = 0
      let currentRootTilt = 0
      let currentRotationSpeed = 0
      let previousFrameTime = 0

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('blur', resetMouseMotion)
      document.addEventListener('mouseleave', resetMouseMotion)

      function animate(currentTime: number) {
        updateTintRects()

        if (previousFrameTime === 0) {
          previousFrameTime = currentTime
        }

        const frameDelta = Math.min(currentTime - previousFrameTime, 48)

        previousFrameTime = currentTime
        currentRootTilt += (targetRootTilt - currentRootTilt) * ROOT_TILT_EASING
        currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * MOUSE_POSITION_EASING
        driverRotation += currentRotationSpeed * frameDelta

        if (Math.abs(currentRootTilt) < 0.00001) currentRootTilt = 0
        if (Math.abs(currentRotationSpeed) < 0.00001) currentRotationSpeed = 0

        rotationHistory.push({
          rotation: driverRotation,
          time: currentTime,
        })

        const oldestTimeToKeep = currentTime - maxDelayMs - 500

        while (rotationHistory.length > 2 && rotationHistory[1].time < oldestTimeToKeep) {
          rotationHistory.shift()
        }

        scenes.forEach((scene) => {
          if (scene.root) {
            scene.root.rotation.z = scene.initialRootRotationZ + currentRootTilt
          }

          scene.planes.forEach((plane, index) => {
            const delayedRotation = getDelayedRotation(rotationHistory, currentTime - index * DELAY_OFFSET_MS)

            plane.rotation.y = scene.initialRotations[index] + delayedRotation
          })
        })

        animationFrameId = window.requestAnimationFrame(animate)
      }

      animationFrameId = window.requestAnimationFrame(animate)
    })

    onBeforeUnmount(() => {
      disposed = true
      stopAnimation()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('blur', resetMouseMotion)
      document.removeEventListener('mouseleave', resetMouseMotion)
      apps.forEach((app) => app.dispose())
      apps = []
    })

    return () =>
      h(
        'div',
        {
          class: 'medvic-spline-background',
          'aria-hidden': 'true',
        },
        [
          h(
            'div',
            {
              class: 'medvic-spline-stage',
              ref: baseStage,
            },
            [
              h('canvas', {
                ref: baseCanvas,
                class: 'medvic-spline-canvas',
              }),
            ],
          ),
          h('div', {
            class: 'medvic-spline-screen',
          }),
          h(
            'div',
            {
              class: 'medvic-spline-tint-layer',
            },
            [
              h(
                'div',
                {
                  class: 'medvic-spline-stage',
                },
                [
                  h('canvas', {
                    ref: tintCanvas,
                    class: 'medvic-spline-canvas',
                  }),
                ],
              ),
            ],
          ),
          h(
            'svg',
            {
              'aria-hidden': 'true',
              class: 'medvic-spline-tint-clip-svg',
              height: '0',
              width: '0',
            },
            [
              h('defs', [
                h(
                  'clipPath',
                  {
                    ref: tintClipPath,
                    id: TINT_CLIP_ID,
                    clipPathUnits: 'userSpaceOnUse',
                  },
                  [],
                ),
              ]),
            ],
          ),
        ],
      )
  },
})
