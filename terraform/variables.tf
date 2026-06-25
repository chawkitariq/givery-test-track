variable "aws_region" {
  description = "AWS region where the infrastructure will be created."
  type        = string
  default     = "eu-west-3"
}

variable "project_name" {
  description = "Prefix used for AWS resource names."
  type        = string
  default     = "test-track"
}

variable "vpc_id" {
  description = "Existing VPC ID that already contains the public and private subnets."
  type        = string
}

variable "public_subnet_id" {
  description = "Existing public subnet ID for the EC2 instance."
  type        = string
}

variable "private_subnet_ids" {
  description = "Existing private subnet IDs for the RDS subnet group. Use at least two subnets."
  type        = list(string)
}

variable "repository_url" {
  description = "Git repository URL that the EC2 instance will clone at boot."
  type        = string
}

variable "db_name" {
  description = "MariaDB database name."
  type        = string
  default     = "testtrack"
}

variable "db_username" {
  description = "Master username for MariaDB."
  type        = string
  default     = "testtrack"
}

variable "db_password" {
  description = "Master password for MariaDB."
  type        = string
  sensitive   = true
}

variable "app_port" {
  description = "Port exposed by the Express app."
  type        = number
  default     = 3000
}
