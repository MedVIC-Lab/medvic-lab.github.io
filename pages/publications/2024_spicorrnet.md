---
layout: publication
title: "Probabilistic 3D Correspondence Prediction from Sparse Unsegmented Images"
authors: "Krithika Iyer, Shireen Elhabian"
conference: "Machine Learning in Medical Imaging Workshop (MLMI) at MICCAI"
year: "2024"
links:
  archive: "https://arxiv.org/abs/2407.01931"
image:
  src: "2024_spicorrnet.jpg"
  alt: Results Highlight
tags: ['SSM', 'Deep Learning']
---

# Probabilistic 3D Correspondence Prediction from Sparse Unsegmented Images
Despite its utility, the conventional SSM construction pipeline is often complex and time-consuming. Additionally, reliance on linearity assumptions further limits the model from capturing clinically relevant variations. Recent advancements in deep learning solutions enable the direct inference of SSM from unsegmented medical images, streamlining the process and improving accessibility. However, the new methods of SSM from images do not adequately account for situations where the imaging data quality is poor or where only sparse information is available. Moreover, quantifying aleatoric uncertainty, which represents inherent data variability, is crucial in deploying deep learning for clinical tasks to ensure reliable model predictions and robust decision-making, especially in challenging imaging conditions. Therefore, we propose SPI-CorrNet, a unified model that predicts 3D correspondences from sparse imaging data. It leverages a teacher network to regularize feature learning and quantifies data-dependent aleatoric uncertainty by adapting the network to predict intrinsic input variances. Experiments on the LGE MRI left atrium dataset and Abdomen CT-1K liver datasets demonstrate that our technique enhances the accuracy and robustness of sparse image-driven SSM. 