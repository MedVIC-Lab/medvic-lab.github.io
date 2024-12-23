---
title: "Weakly Supervised Bayesian Shape Modeling from Medical Images"
authors: "Jadie Adams, Krithika Iyer, Shireen Elhabian. "
conference: "Shape in Medical Imaging (ShapeMI) at MICCAI"
year: "2024"
link: "https://arxiv.org/abs/2405.09697"
image:
  src: "2024_weaklydeepssm.png"
  alt: Results Highlight
---

# Weakly Supervised Bayesian Shape Modeling from Medical Images
We introduce a weakly supervised deep learning approach to predict SSM from images using point cloud supervision. Specifically, we propose reducing the supervision associated with the state-of-the-art fully Bayesian variational information bottleneck DeepSSM (BVIB-DeepSSM) model. BVIB-DeepSSM is an effective, principled framework for predicting probabilistic anatomical shapes from images with quantification of both aleatoric and epistemic uncertainties. Whereas the original BVIB-DeepSSM method requires strong supervision in the form of ground truth correspondence points, the proposed approach utilizes weak supervision via point cloud surface representations, which are more readily obtainable. Furthermore, the proposed approach learns correspondence in a completely data-driven manner without prior assumptions about the expected variability in shape cohort. Our experiments demonstrate that this approach yields similar accuracy and uncertainty estimation to the fully supervised scenario while substantially enhancing the feasibility of model training for SSM construction. 