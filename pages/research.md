---
aside: false
---

# Research

MedVIC builds AI systems in which structure is treated as a first-class object of modeling rather than an emergent byproduct of scale. In medical and scientific imaging, data are complex, supervision is sparse or heterogeneous, and reliability matters as much as accuracy. We pursue a principled approach to representation and inference in which probabilistic modeling, geometric constraints, and structured learning are deliberately designed into our methods.

---

## Three Research Themes

<div id="modeling-patient-state" class="medvic-theme-section">

### Modeling Patient State

**For all visitors:** For a clinician, a medical image is not a grid of pixels — it's a window into anatomy. But for a standard AI system, anatomy is just another pattern. We think that's wrong.

Anatomy has shape. That shape carries information — about disease severity, surgical risk, individual variation, and how the body changes over time. And critically: anatomy is not just geometry. It is a structured signal that varies in a continuous, population-level way. Disease is not a threshold — it is a shift in that distribution. We develop methods that make that shape computationally explicit: statistical shape models that capture how anatomy varies across populations, deep learning frameworks that infer anatomical representations directly from raw images, and probabilistic models that quantify variability in continuous, interpretable latent spaces.

Our flagship tool — **ShapeWorks** — provides an open-source ecosystem for this kind of analysis. Used by researchers at over 100 institutions worldwide, it enables population-scale anatomy modeling across cardiology, orthopedics, craniofacial surgery, and more. **CranioRate** translates this capability directly into clinical practice, converting 3D cranial geometry into objective severity scores that are changing how surgeons assess and treat craniosynostosis.

We've also pushed what's technically possible: learning shape models directly from point clouds without manual segmentation ([Point2SSM](/pages/publications/2024_point2ssm), ICLR 2024 Spotlight), from surface meshes ([Mesh2SSM](/pages/publications/2023_mesh2ssm), MICCAI 2023), and from raw unsegmented images (VIB-DeepSSM, Image2SSM). These aren't just faster variants of classical methods — they change what's possible in clinical-scale data environments.

<details class="medvic-cs-detail">
<summary>CS / Methodological Detail</summary>

The core technical framework is **particle-based statistical shape modeling (SSM)**: correspondence points are optimized jointly across a population to find a compact, information-optimal representation of shape variation. The resulting model lives in a low-dimensional latent space where each direction of variation is interpretable anatomically. Extensions include:

- **VIB-DeepSSM / BVIB-DeepSSM**: amortized inference of shape model parameters using the Variational Information Bottleneck, replacing expensive test-time optimization with a forward pass. Full uncertainty quantification over both correspondences and latent codes.
- **Point2SSM**: equivariant point cloud encoder with attention-based correspondence mapping. No mesh or segmentation required. Trained with a combination of reconstruction loss and population-level compactness/specificity/generalization.
- **Image2SSM**: radial basis function parameterization enabling end-to-end learning from raw images to shape space, bypassing segmentation entirely.
- **MASSM**: multi-anatomy simultaneous shape modeling — single inference for multi-structure cases (e.g., cardiac chambers, foot bones).

</details>

**Applications:**
- Cardiac: left atrium shape in atrial fibrillation; right ventricular remodeling in tricuspid regurgitation
- Orthopedics: hip dysplasia, femoroacetabular impingement, foot and ankle osteoarthritis, subtalar joint
- Craniofacial surgery: craniosynostosis severity assessment (CranioRate); multi-center clinical deployment
- Musculoskeletal biomechanics: Legg-Calvé-Perthes disease, Charcot-Marie-Tooth talar morphology
- Spine: vertebra statistical shape modeling for spinal reconstruction (EOS Imaging)
- Shoulder: scapular morphology in glenohumeral instability

</div>

---

<div id="learning-under-clinical-constraints" class="medvic-theme-section">

### Learning Under Clinical Constraints

**For all visitors:** Real clinical data is not clean. Labels are global, expensive, and inconsistent. Scanners vary across sites. Imaging protocols differ between institutions. Pathology slides have staining variability. Models trained on one site's data don't always work at another's.

These aren't edge cases — they're the norm. And they're not solvable by collecting more annotated data, because more annotated data is exactly what clinical settings can't provide. The key reframe: **clinical constraints are not a limitation — they define how we design representations.** The question is not how to work around messy data, but how to design learning systems that treat the messiness as a specification.

We develop learning frameworks built for these constraints. Structured multi-instance learning that aligns supervision granularity with clinical reasoning, not just global slide-level labels. Domain adaptation that learns invariant representations rather than domain-specific shortcuts. Cross-modal learning that uses information-rich modalities to guide representation learning in data-scarce or distribution-shifted settings. Generative systems that synthesize biologically grounded supervision at scale — virtual staining, modality translation, annotation generation — dramatically reducing the annotation burden while preserving biological meaning.

<details class="medvic-cs-detail">
<summary>CS / Methodological Detail</summary>

Key methodological frameworks:

- **Multi-Instance Learning (MIL)**: structured aggregation across instances at multiple scales (PC-MIL, AC-MIL). Not vanilla bag-of-instances — we design aggregation operators that align with the structure of clinical reasoning (hierarchical, concept-disentangled).
- **Unsupervised Domain Adaptation (UDA)**: density matching in feature space (UDA-Density-Matching); cross-domain normative distribution alignment for shape models.
- **Virtual Staining / Modality Translation**: score-based diffusion (StainDiffuser), implicit neural functions (ImplicitStainer), CycleGAN variants with structure preservation (Structural-CycleGAN). Goal: generate biologically valid supervision from cheap modalities.
- **Cross-Modal Representation Learning**: SIMPLER — structured illumination microscopy paired with widefield as training signal; learning spatially consistent representations from modality-paired data without pixel-level labels.

</details>

**Applications:**
- Computational pathology: colorectal cancer gland segmentation, prostate cancer treatment response, tumor microenvironment characterization
- Virtual immunohistochemistry: multiplexed staining inference from H&E images (VIMs, StainDiffuser, ImplicitStainer)
- Atrial fibrillation: late gadolinium-enhanced MRI quality assessment (HAMIL-QA, AC-MIL)
- Intraoperative imaging: cross-modal learning for structured illumination microscopy (SIMPLER, ARPA-H project)
- Whole-slide pathology: multi-scale supervision alignment for slide-level and region-level reasoning (PC-MIL)

</div>

---

<div id="clinically-trustworthy-ai" class="medvic-theme-section">

### Clinically Trustworthy AI

**For all visitors:** Accurate isn't the same as trustworthy. A model that performs at 90% accuracy on average can fail systematically and silently on the cases that matter most — rare conditions, unusual presentations, data from underrepresented populations, images acquired under non-standard conditions. In clinical settings, those silent failures are not acceptable.

In medicine, **a model that is occasionally wrong is expected — but a model that is confidently wrong is dangerous.**

Clinicians need more than a prediction. They need to know what a model knows and what it doesn't. They need to see its reasoning, not just its outputs. And they need to trust it across the variability of real practice — not just the clean distribution of a benchmark dataset.

We build AI systems with those requirements built in. Uncertainty is embedded directly into representation and inference — not as a post hoc confidence score, but as a first-class modeling object. We develop density-based reliability mechanisms that signal when inputs fall outside a model's experience. We design concept-level interpretability frameworks that decompose predictions into clinically meaningful factors rather than opaque activation patterns. And we establish evaluation methodologies that measure reliability as a system-level property.

**Trust is not accuracy — it is knowing what the model knows, and what it does not know.**

<details class="medvic-cs-detail">
<summary>CS / Methodological Detail</summary>

Core technical contributions:

- **Variational Information Bottleneck (VIB)**: information-theoretic regularization for representation learning. VIB-DeepSSM uses the VIB principle to decompose epistemic (model) uncertainty from aleatoric (data) uncertainty in shape prediction. BVIB-DeepSSM extends this to full Bayesian treatment with structured priors over the latent shape space.
- **Density-based reliability**: SCorP uses normalizing flow density estimation to detect out-of-distribution inputs during correspondence prediction — the model flags cases it has never seen rather than predicting silently.
- **Concept-based interpretability**: MedConcept uses contrastive concept bottleneck models to decompose medical vision-language model decisions into clinically named concepts — enabling post-hoc inspection and targeted debugging.
- **Uncertainty in segmentation**: slice propagation with uncertainty quantification (SlicePropUQ) — epistemic uncertainty maps that identify slices where the model is least reliable.

</details>

**Applications:**
- Uncertainty-aware anatomical shape prediction (VIB-DeepSSM, BVIB-DeepSSM, SCorP)
- Epistemic vs. aleatoric uncertainty decomposition in 3D medical image segmentation
- Density-based reliability assessment for population-scale anatomy modeling
- Concept-level interpretability in medical vision-language models (MedConcept)
- Concept-disentangled MRI quality assessment (AC-MIL)
- Accelerated MRI reconstruction with principled uncertainty (LEDA, Unrolled Reconstruction)

</div>

---

## Research Roots — Historical Context

MedVIC's foundational methods trace to algorithmic work in 2007–2016 on active contours, level-set methods, shape-based interpolation, image-guided surgery, and medical image segmentation. This computational geometry heritage is why our approach to anatomy modeling is structurally different from standard black-box deep learning: we design systems that take geometry seriously as a modeling object, not just a label to predict.

The lab's identity as a methods group — not an applications group — was established early and remains defining. Every clinical application we work on is motivated by a technical problem we couldn't solve with existing methods.

---

## Active Research Funding

### As Principal Investigator or Multi-PI

<table class="medvic-funding-table">
<thead><tr><th>Grant</th><th>Agency</th><th>Period</th><th>Role</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>NIH-NIBIB R01EB034103 — ShapeWorks 2.0</td><td>NIH-NIBIB</td><td>2023–2028</td><td>PI</td><td>$2.80M</td></tr>
<tr><td>NIH-NIDCR R01DE033397 — CranioRate</td><td>NIH-NIDCR</td><td>2022–2027</td><td>MPI</td><td>$2.87M</td></tr>
<tr><td>ARPA-H — MAGIC-SCAN (Cancer Moonshot)</td><td>ARPA-H</td><td>2024–2028</td><td>PI (Utah site)</td><td>$2.5M (Utah)</td></tr>
<tr><td>NIH-NIAMS R01AR076120 — Weakly-Supervised SSM</td><td>NIH-NIAMS</td><td>2020–2025</td><td>PI</td><td>$1.84M</td></tr>
<tr><td>NIH-NHLBI R01HL162353 — LGE-MRI Quality</td><td>NIH-NHLBI</td><td>2022–2027</td><td>MPI</td><td>$2.49M</td></tr>
</tbody>
</table>

### As Co-Investigator

<table class="medvic-funding-table">
<thead><tr><th>Grant</th><th>Agency</th><th>Period</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>NIH-NICHD R01HD117342 — Transhumeral Amputation Biomechanics</td><td>NIH-NICHD</td><td>2025–2030</td><td>$3.17M</td></tr>
<tr><td>NIH-NIDCD R01DC021938 — Benign Paroxysmal Positional Vertigo</td><td>NIH-NIDCD</td><td>2025–2030</td><td>$2.57M</td></tr>
<tr><td>NSF — Collaborative Research in Computational Shape Analysis</td><td>NSF</td><td>2021–2026</td><td>—</td></tr>
</tbody>
</table>
