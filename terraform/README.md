# Terraform AWS Infra

Minimal AWS infrastructure for:

- a private MariaDB RDS database
- a lightweight EC2 instance for the Express app
- the required security groups and IAM permissions
- an EC2 bootstrap script that clones the repo, installs dependencies, builds the app, and starts it

## Prerequisites

- An existing VPC
- At least 1 public subnet for EC2
- At least 2 private subnets for RDS
- A Git repository URL reachable from the EC2 instance

## Usage

1. Copy `terraform.tfvars.example` to `terraform.tfvars`
2. Fill in the variable values
3. Run:

```bash
terraform init
terraform plan
terraform apply
```

