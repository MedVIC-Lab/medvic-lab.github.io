---
layout: publication
title: "Spatiotemporal Cardiac Statistical Shape Modeling: A Data-Driven Approach"
authors: "Jadie Adams, Nawazish Khan, Alan Morris, Shireen Elhabian"
conference: "Statistical Atlases and Computational Models of the Heart (STACOM) at MICCAI"
year: "2022"
links: 
  archive: "https://arxiv.org/abs/2209.02736"
image:
  src: "2022_spatiotemporal_ssm.png"
  alt: Results Highlight
---

# Spatiotemporal Cardiac Statistical Shape Modeling: A Data-Driven Approach

Existing methods for modeling spatiotemporal or longitudinal shape changes require predefined shape atlases and pre-built shape models that are typically constructed cross-sectionally. This paper proposes a data-driven approach inspired by the PSM method to learn population-level spatiotemporal shape changes directly from shape data. We introduce a novel SSM optimization scheme that produces landmarks that are in correspondence both across the population (inter-subject) and across time-series (intra-subject). We apply the proposed method to 4D cardiac data from atrial-fibrillation patients and demonstrate its efficacy in representing the dynamic change of the left atrium. Furthermore, we show that our method outperforms an image-based approach for spatiotemporal SSM with respect to a generative time-series model, the Linear Dynamical System (LDS). LDS fit using a spatiotemporal shape model optimized via our approach provides better generalization and specificity, indicating it accurately captures the underlying time-dependency. 