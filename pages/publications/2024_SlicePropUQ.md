---
layout: publication
title: "Estimation and Analysis of Slice Propagation Uncertainty in 3D Anatomy Segmentation"
authors: "Rachaell Nihalaani, Tushar Kataria, Jadie Adams, Shireen Y Elhabian"
conference: "International Conference on Medical Image Computing and Computer-Assisted Intervention"
year: "2024"
links:
  publisher: "https://link.springer.com/chapter/10.1007/978-3-031-72117-5_26"
---

# Uncertainty Quantification for Slice Propagation Models

Supervised methods for 3D anatomy segmentation demonstrate superior performance but are often limited by the availability of annotated data. This limitation has led to a growing interest in self-supervised approaches in tandem with the abundance of available unannotated data. Slice propagation has emerged as a self-supervised approach that leverages slice registration as a self-supervised task to achieve full anatomy segmentation with minimal supervision. This approach significantly reduces the need for domain expertise, time, and the cost associated with building fully annotated datasets required for training segmentation networks. However, this shift toward reduced supervision via deterministic networks raises concerns about the trustworthiness and reliability of predictions, especially when compared with more accurate supervised approaches. To address this concern, we propose integrating calibrated uncertainty quantification (UQ) into slice propagation methods, which would provide insights into the model’s predictive reliability and confidence levels. Incorporating uncertainty measures enhances user confidence in self-supervised approaches, thereby improving their practical applicability. We conducted experiments on three datasets for 3D abdominal segmentation using five UQ methods. The results illustrate that incorporating UQ improves not only model trustworthiness but also segmentation accuracy. Furthermore, our analysis reveals various failure modes of slice propagation methods that might not be immediately apparent to end-users. This study opens up new research avenues to improve the accuracy and trustworthiness of slice propagation methods.
