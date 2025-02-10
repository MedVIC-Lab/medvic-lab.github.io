---
layout: publication
title: "To pretrain or not to pretrain? A case study of domain-specific pretraining for semantic segmentation in histopathology"
authors: "Tushar Kataria, Beatrice S Knudsen, Shireen Y. Elhabian"
conference: "Workshop on Medical Image Learning with Limited and Noisy Data"
year: "2023"
links: 
  code: "https://github.com/MedVIC-Lab/Histopathology-Domain-Specific-Pretraining"
  publisher: "https://link.springer.com/chapter/10.1007/978-3-031-44917-8_24"
image:
  src: "2023_benchmarking_pathology_pretraining.png"
  alt: Benchmarking Semantic Segmentation
tags: ['Image Processing', 'Segmentation']
---

# Benchmarking Whether Domain Specific pretraining helps in better gland and cell segmentation in histopathology

Annotating medical imaging datasets is costly, so fine-tuning (or transfer learning) is the most effective method for digital pathology vision applications such as disease classification and semantic segmentation. However, due to texture bias in models trained on real-world images, transfer learning for histopathology applications might result in underperforming models, which necessitates the need for using unlabeled histopathology data and self-supervised methods to discover domain-specific characteristics. Here, we tested the premise that histopathology-specific pretrained models provide better initializations for pathology vision tasks, i.e., gland and cell segmentation. In this study, we compare the performance of gland and cell segmentation tasks with histopathology domain-specific and non-domain-specific (real-world images) pretrained weights. Moreover, we investigate the dataset size at which domain-specific pretraining produces significant gains in performance. In addition, we investigated whether domain-specific initialization improves the effectiveness of out-of-distribution testing on distinct datasets but the same task. The results indicate that performance gain using domain-specific pretrained weights depends on both the task and the size of the training dataset. In instances with limited dataset sizes, a significant improvement in gland segmentation performance was also observed, whereas models trained on cell segmentation datasets exhibit no improvement.
