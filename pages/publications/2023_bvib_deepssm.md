---
layout: publication
title: "Fully Bayesian VIB DeepSSM"
authors: "Jadie Adams, Shireen Elhabian"
conference: "MICCAI"
year: "2023"
links: 
  code: "https://github.com/MedVIC-Lab/BVIB-DeepSSM"
  archive: "https://arxiv.org/pdf/2305.05797.pdf"
image:
  src: "2023_bvib_deepssm.png"
  alt: Results Highlight
tags: ['DeepSSM', 'SSM']
---

# Fully Bayesian VIB DeepSSM
VIB is only half-Bayesian and lacks epistemic uncertainty inference. We derive a fully Bayesian VIB formulation and demonstrate the efficacy of two scalable implementation approaches: concrete dropout and batch ensemble. Additionally, we introduce a novel combination of the two that further enhances uncertainty calibration via multimodal marginalization. Experiments on synthetic shapes and left atrium data demonstrate that the fully Bayesian VIB network predicts SSM from images with improved uncertainty reasoning without sacrificing accuracy.