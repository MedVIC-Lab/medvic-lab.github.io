---
layout: publication
title: "MASSM: An End-to-End Deep Learning Framework for Multi Anatomy Statistical Shape Modeling Directly From Images"
authors: "Janmesh Ukey, Tushar Kataria, Shireen Y Elhabian"
conference: "International Workshop on Shape in Medical Imaging"
year: "2024"
links:
  publisher: "https://link.springer.com/chapter/10.1007/978-3-031-75291-9_12"
image:
  src: "2024_MASSM.png"
  alt: Automated Annotation
---

# A method for multi-anatomy SSM directly from Images.

Statistical shape modeling (SSM) effectively analyzes anatomical variations within populations but is limited by the need for manual localization and segmentation, which relies on scarce medical expertise. Recent advances in deep learning have provided a promising approach that automatically generates statistical representations (as point distribution models or PDMs) from unsegmented images. Once trained, these deep learning-based models eliminate the need for manual segmentation for new subjects. Most deep learning methods still require manual pre-alignment of image volumes and bounding box specifications around the target anatomy, leading to a partially manual inference process. Recent approaches facilitate anatomy localization but only estimate population-level statistical representations and cannot directly delineate anatomy in images. Additionally, they are limited to modeling a single anatomy. We introduce MASSM, a novel end-to-end deep learning framework that simultaneously localizes multiple anatomies, estimates population-level statistical representations, and delineates shape representations directly in image space. Our results show that MASSM, which delineates anatomy in image space and handles multiple anatomies through a multitask network, provides superior shape information compared to segmentation networks for medical imaging tasks. Estimating SSM is a stronger task than segmentation because it encodes a more robust statistical prior for the objects to be detected and delineated. MASSMallows for more accurate and comprehensive shape representations, surpassing the capabilities of traditional pixel-wise segmentation.
