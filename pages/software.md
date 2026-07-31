---
aside: false
---

# Software

MedVIC maintains two flagship platforms and 15+ additional open-source tools. All code lives on [GitHub / MedVIC-Lab](https://github.com/MedVIC-Lab).

---

## ShapeWorks

<div class="medvic-tool-card" style="margin:1.5rem 0;">
  <div style="display:flex;gap:2rem;align-items:flex-start;flex-wrap:wrap;">
    <div style="flex:1;min-width:280px;">
      <h3 style="margin-top:0;">ShapeWorks — Open-Source Anatomy Modeling Platform</h3>
      <p>ShapeWorks is a free, open-source platform for automated construction of statistical shape models of anatomical structures. Developed by the MedVIC lab and the Scientific Computing and Imaging Institute, it provides the complete analysis pipeline: image preprocessing and quality control, correspondence optimization, shape representation, statistical analysis, and visualization — all in a unified, modular framework.</p>
      <div class="tool-stats">
        <span class="medvic-tool-stat-pill">8,000+ downloads</span>
        <span class="medvic-tool-stat-pill">100+ institutions</span>
        <span class="medvic-tool-stat-pill">163+ citing studies</span>
        <span class="medvic-tool-stat-pill">14 major releases since 2019</span>
        <span class="medvic-tool-stat-pill">NIH-funded since 2017</span>
      </div>
      <p><strong>Applications:</strong> cardiology · orthopedics · craniofacial surgery · neuroscience · spine · biomechanics</p>
      <div class="medvic-tool-links">
        <a href="https://shapeworks.sci.utah.edu" target="_blank" class="medvic-tool-link primary">shapeworks.sci.utah.edu ↗</a>
        <a href="https://github.com/SCIInstitute/ShapeWorks" target="_blank" class="medvic-tool-link secondary">GitHub ↗</a>
        <a href="https://shapeworks.sci.utah.edu/docs" target="_blank" class="medvic-tool-link secondary">Documentation ↗</a>
      </div>
    </div>
    <div class="medvic-software-visual">
      <img
        src="/assets/images/software/shapeworks-logo.png"
        alt="ShapeWorks logo"
        class="medvic-software-image medvic-software-image-logo"
      />
    </div>
  </div>
</div>

---

## CranioRate

<div class="medvic-tool-card" style="margin:1.5rem 0;">
  <div style="display:flex;gap:2rem;align-items:flex-start;flex-wrap:wrap;">
    <div style="flex:1;min-width:280px;">
      <h3 style="margin-top:0;">CranioRate — AI Severity Scoring for Craniosynostosis</h3>
      <p>CranioRate converts a patient's 3D CT scan into an objective, population-grounded severity score for craniosynostosis — replacing subjective, qualitative clinical assessment with reproducible, data-driven measurement. Severity is not a number: it is a shape. CranioRate quantifies deviation from normative anatomy across a continuous spectrum aligned with expert clinical judgment.</p>
      <p>Deployed across 7 institutions, it is becoming a shared measurement standard across sites, surgeons, and studies — enabling consistent assessment regardless of where the patient is seen.</p>
      <div class="tool-stats">
        <span class="medvic-tool-stat-pill">2,900+ scans processed</span>
        <span class="medvic-tool-stat-pill">7 active clinical sites</span>
        <span class="medvic-tool-stat-pill">International sites onboarding</span>
        <span class="medvic-tool-stat-pill">Privacy by design</span>
      </div>
      <p><strong>Supported subtypes:</strong> sagittal · metopic · unicoronal</p>
      <div class="medvic-tool-links">
        <a href="https://craniorate.org" target="_blank" class="medvic-tool-link primary">craniorate.org ↗</a>
        <a href="/pages/publications/2025_CranioRate" class="medvic-tool-link secondary">Read the paper</a>
      </div>
    </div>
    <div class="medvic-software-visual">
      <img
        src="/assets/images/software/craniorate-survey.png"
        alt="CranioRate survey interface"
        class="medvic-software-image"
      />
    </div>
  </div>
</div>

---

## Additional Open-Source Tools

### Image Registration

| Tool | Description | Venue | Links |
|------|-------------|-------|-------|
| **EfficientMorph** | Parameter-efficient transformer for 3D image registration | WACV 2025 | [GitHub](https://github.com/MedVIC-Lab/EfficientMorph) |
| **LEDA** | Log-Euclidean Diffeomorphism Autoencoder for statistical analysis of deformations | IPMI 2025 | [GitHub](https://github.com/MedVIC-Lab/LEDA) |
| **MORPH-LER** | Population-aware log-Euclidean regularization for deep registration | MIDL 2025 | [GitHub](https://github.com/MedVIC-Lab/MORPH-LER) |

### Shape Modeling from Images

| Tool | Description | Venue | Links |
|------|-------------|-------|-------|
| **VIB-DeepSSM / BVIB-DeepSSM** | Probabilistic anatomical shape models from images | MICCAI 2022, 2023 | [GitHub](https://github.com/MedVIC-Lab/VIB-DeepSSM) |
| **Image2SSM** | Statistical shape models from images using radial basis functions | MICCAI 2023 | [GitHub](https://github.com/MedVIC-Lab/Image2SSM) |
| **SCorP** | Statistics-informed dense correspondence from unsegmented images | MIUA 2024 | [GitHub](https://github.com/MedVIC-Lab/SCorP) |
| **MASSM** | Multi-anatomy shape modeling directly from images | ShapeMI 2024 | [GitHub](https://github.com/MedVIC-Lab/MASSM) |
| **Uncertain-DeepSSM** | Probabilistic shape models with uncertainty quantification | ShapeMI 2020 | — |

### Shape Modeling from Surfaces

| Tool | Description | Venue | Links |
|------|-------------|-------|-------|
| **Point2SSM / Point2SSM++** | Shape models from point clouds | ICLR 2024 / MedIA 2026 | [GitHub](https://github.com/MedVIC-Lab/Point2SSM) |
| **Mesh2SSM** | Shape models from surface meshes | MICCAI 2023 | [GitHub](https://github.com/MedVIC-Lab/Mesh2SSM) |
| **SPI-CorrNet** | Probabilistic 3D correspondence from sparse unsegmented images | MICCAI-MLMI 2024 | [GitHub](https://github.com/MedVIC-Lab/SPI-CorrNet) |

### Generative Modeling

| Tool | Description | Venue | Links |
|------|-------------|-------|-------|
| **ShapeOdds** | Variational Bayesian learning of generative shape models | CVPR 2017 | [GitHub](https://github.com/MedVIC-Lab/ShapeOdds) |
| **MorphoFlow** | Normalizing flows for morphological shape modeling | Under review 2026 | — |
| **dpVAE** | Decoupled priors for variational autoencoders | ACCV 2020 | [GitHub](https://github.com/MedVIC-Lab/dpVAE) |

### Computational Pathology

| Tool | Description | Venue | Links |
|------|-------------|-------|-------|
| **StainDiffuser** | Virtual staining via dual-task score-based diffusion | arXiv 2024 | [GitHub](https://github.com/MedVIC-Lab/StainDiffuser) |
| **Structural CycleGAN** | Structure-preserving virtual immunohistochemistry | MICCAI-MLMI 2023 | [GitHub](https://github.com/MedVIC-Lab/StructuralCycleGAN) |
| **ImplicitStainer** | Data-efficient virtual staining using local implicit functions | arXiv 2025 | [GitHub](https://github.com/MedVIC-Lab/ImplicitStainer) |
| **Histopathology Pretraining Study** | Domain-specific pretraining analysis | MICCAI-MILLanD 2023 | [GitHub](https://github.com/MedVIC-Lab) |

---

All tools are open-source and available on [GitHub / MedVIC-Lab](https://github.com/MedVIC-Lab). We welcome issues, pull requests, and collaboration inquiries.
