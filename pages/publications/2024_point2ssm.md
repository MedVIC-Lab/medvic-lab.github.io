---
layout: publication
title: "Point2SSM: Learning Morphological Variations of Anatomies from Point Cloud"
authors: "Jadie Adams, Shireen Elhabian"
conference: "ICLR"
year: "2024"
links: 
  code: "https://github.com/MedVIC-Lab/Point2SSM"
  archive: "https://arxiv.org/abs/2305.14486"
image:
  src: "2024_point2ssm.png"
  alt: Results Highlight
tags: ['Deep Learning', 'SSM']
---

# Point2SSM: Learning Morphological Variations of Anatomies from Point Cloud
Traditional methods of SSM construction have limitations, including the requirement of noise-free surface meshes or binary volumes, reliance on assumptions or templates, and prolonged inference times due to simultaneous optimization of the entire cohort. Point2SSM overcomes these barriers by providing a data-driven solution that infers SSMs directly from raw point clouds, reducing inference burdens and increasing applicability as point clouds are more easily acquired. While deep learning on 3D point clouds has seen success in unsupervised representation learning and shape correspondence, its application to anatomical SSM construction is largely unexplored. We conduct a benchmark of state-of-the-art point cloud deep networks on the SSM task, revealing their limited robustness to clinical challenges such as noisy, sparse, or incomplete input and limited training data. Point2SSM addresses these issues through an attention-based module, providing effective correspondence mappings from learned point features. Our results demonstrate that the proposed method significantly outperforms existing networks in terms of accurate surface sampling and correspondence, better capturing population-level statistics. 

