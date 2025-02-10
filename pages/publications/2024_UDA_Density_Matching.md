---
layout: publication
title: "Unsupervised Domain Adaptation for Semantic Segmentation Under Target Data Scarcity"
authors: "Tushar Kataria, Beatrice S Knudsen, Shireen Y Elhabian"
conference: "2024 IEEE International Symposium on Biomedical Imaging (ISBI)"
year: "2024"
links:
  publisher: "https://ieeexplore.ieee.org/abstract/document/10635646"
image:
  src: "2024_UDA_Density_Matching.png"
  alt: UDA Density Matching
tags: ['Deep Learning', 'Segmentation']
---

# Method for Unsupervised Domain Adaptation using Target Density Matching

Deep learning approaches for semantic segmentation rely on harnessing the power of annotated images to learn features indicative of semantic classes. However, they often fail to generalize when there is a significant domain (i.e., distributional) shift between the training (i.e., source) data and the dataset(s) encountered when deployed (i.e., target), necessitating manual annotations for the target data to achieve acceptable performance. Domain shift is especially important in medical imaging because different image modalities have significant intra- and intersite variations due to protocol and vendor variability. Current techniques are sensitive to hyperparameter tuning and target dataset size. This paper introduces an unsupervised domain adaptation method for semantic segmentation that eliminates the requirement for a substantial quantity of target data samples and their associated annotations. Using kernel density estimation, we match the target data distribution to the source in the feature space. We demonstrate the efficacy of our proposed approach on two datasets, multisite prostate MRI and histopathology images, particularly when the number of unannotated target samples available is limited.
