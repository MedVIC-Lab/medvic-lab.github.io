---
title: "Structural cycle gan for virtual immunohistochemistry staining of gland markers in the colon"
authors: "Shikha Dubey,Tushar Kataria, Beatrice S Knudsen, Shireen Y. Elhabian"
conference: "International Workshop on Machine Learning in Medical Imaging"
year: "2023"
link: "https://link.springer.com/chapter/10.1007/978-3-031-45676-3_45"
image:
  src: "2023_SCGAN_virtual_staining.png"
  alt: Structural CycleGAN
---

# Propose a new architecture for Virtual Staining regularizing the learning via structural consistency.

With the advent of digital scanners and deep learning, diagnostic operations may move from a microscope to a desktop. Hematoxylin and Eosin (H &E) staining is one of the most frequently used stains for disease analysis, diagnosis, and grading, but pathologists do need different immunohistochemical (IHC) stains to analyze specific structures or cells. Obtaining all of these stains (H &E and different IHCs) on a single specimen is a tedious and time-consuming task. Consequently, virtual staining has emerged as an essential research direction. Here, we propose a novel generative model, Structural Cycle-GAN (SC-GAN), for synthesizing IHC stains from H &E images, and vice versa. Our method expressly incorporates structural information in the form of edges (in addition to color data) and employs attention modules exclusively in the decoder of the proposed generator model. This integration enhances feature localization and preserves contextual information during the generation process. In addition, a structural loss is incorporated to ensure accurate structure alignment between the generated and input markers. To demonstrate the efficacy of the proposed model, experiments are conducted with two IHC markers emphasizing distinct structures of glands in the colon: the nucleus of epithelial cells (CDX2) and the cytoplasm (CK818). Quantitative metrics such as FID and SSIM are frequently used for the analysis of generative models, but they do not correlate explicitly with higher-quality virtual staining results. Therefore, we propose two new quantitative metrics that correlate directly with the virtual staining specificity of IHC markers.
