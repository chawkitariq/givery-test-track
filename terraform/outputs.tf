output "ec2_public_ip" {
  description = "Public IP address of the EC2 instance."
  value       = aws_instance.app.public_ip
}

output "app_url" {
  description = "Public URL for the Express app."
  value       = "http://${aws_instance.app.public_ip}:${var.app_port}"
}

output "rds_endpoint" {
  description = "RDS MariaDB endpoint."
  value       = aws_db_instance.mariadb.address
}

output "rds_port" {
  description = "RDS MariaDB port."
  value       = aws_db_instance.mariadb.port
}
