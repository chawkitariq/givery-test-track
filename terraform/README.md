# Terraform AWS Infra

Infra minimale pour:

- une RDS MariaDB privée
- une EC2 légère pour l'app Express
- les security groups et l'IAM nécessaires
- un bootstrap EC2 qui clone le repo, installe les dépendances, build et démarre l'app

## Prérequis

- Un VPC existant
- Au moins 1 subnet public pour l'EC2
- Au moins 2 subnets privés pour la RDS
- Une URL Git accessible depuis l'EC2

## Utilisation

1. Copier `terraform.tfvars.example` vers `terraform.tfvars`
2. Renseigner les valeurs des variables
3. Lancer:

```bash
terraform -chdir=terraform init
terraform -chdir=terraform plan
terraform -chdir=terraform apply
```

