---
layout: publication
title: "Automating ground truth annotations for gland segmentation through immunohistochemistry"
authors: "Tushar Kataria, Saradha Rajamani, Abdul Bari Ayubi, Mary Bronner, Jolanta Jedrzkiewicz, Beatrice S Knudsen, Shireen Y Elhabian"
conference: "Modern Pathology, Volume 36, Issue 12"
year: "2023"
links: 
  publisher: "https://www.sciencedirect.com/science/article/pii/S0893395223002363"
image:
  src: "2023_Automated_Annotation_pathology.png"
  alt: Automated Annotation
tags: ['Deep Learning', 'Image Processing']
---

# End to End processing Pipeline for Automated Annotation using Immunohistochemistry.

Microscopic evaluation of glands in the colon is of utmost importance in the diagnosis of inflammatory bowel disease and cancer. When properly trained, deep learning pipelines can provide a systematic, reproducible, and quantitative assessment of disease-related changes in glandular tissue architecture. The training and testing of deep learning models require large amounts of manual annotations, which are difficult, time-consuming, and expensive to obtain. Here, we propose a method for automated generation of ground truth in digital hematoxylin and eosin (H&E)–stained slides using immunohistochemistry (IHC) labels. The image processing pipeline generates annotations of glands in H&E histopathology images from colon biopsy specimens by transfer of gland masks from KRT8/18, CDX2, or EPCAM IHC. The IHC gland outlines are transferred to coregistered H&E images for training of deep learning models. We compared the performance of the deep learning models to that of manual annotations using an internal held-out set of biopsy specimens as well as 2 public data sets. Our results show that EPCAM IHC provides gland outlines that closely match manual gland annotations (Dice = 0.89) and are resilient to damage by inflammation. In addition, we propose a simple data sampling technique that allows models trained on data from several sources to be adapted to a new data source using just a few newly annotated samples. The best performing models achieved average Dice scores of 0.902 and 0.89 on Gland Segmentation and Colorectal Adenocarcinoma Gland colon cancer public data sets, respectively, when trained with only 10% of annotated cases from either public cohort. Altogether, the performances of our models indicate that automated annotations using cell type–specific IHC markers can safely replace manual annotations. Automated IHC labels from single-institution cohorts can be combined with small numbers of hand-annotated cases from multi-institutional cohorts to train models that generalize well to diverse data sources.
