---
layout: publication
title: "SCorP: Statistics-Informed Dense Correspondence Prediction Directly from Unsegmented Medical Images"
authors: "Krithika Iyer, Jadie Adams, Shireen Elhabian"
conference: "Medical Image Understanding and Analysis (MIUA)"
year: "2024"
links:
  code: "https://github.com/MedVIC-Lab/SCorP_MIUA2024"
  archive: "https://arxiv.org/abs/2404.17967"
image:
  src: "2024_scorp.jpg"
  alt: Results Highlight
tags: ['Image Processing', 'Deep Learning']
---

# SCorP: Statistics-Informed Dense Correspondence Prediction Directly from Unsegmented Medical Images
Existing deep learning methods for estimating correspondences from CT/MRI images rely heavily on established PDMs for training, limiting their applicability and generalization. Moreover, volumetric images could contain misleading information, effectively regularizing the correspondence estimation process becomes critical for precise feature extraction. This work proposes an approach to predict correspondences directly from raw images without relying on pre-optimized PDMs, leveraging shape prior built from surface representations like meshes, point clouds, or segmentations to guide the image-driven SSM task to learn predictive features.