# Test Track

Test Track is a small Express API for managing recipes.

It provides a simple REST API with basic CRUD endpoints:
- `POST /recipes`
- `GET /recipes`
- `GET /recipes/:id`
- `PATCH /recipes/:id`
- `DELETE /recipes/:id`

The project uses:
- Node.js
- Express
- MariaDB
- TypeScript

## Local Setup

### Prerequisites

- Node.js 22 or newer
- npm
- Docker and Docker Compose if you want to run the database in containers

## Run the App Locally

### Environment File

Create your local environment file before running the app:

```bash
cp .env.example .env
```

### Option 1: Run with Docker Compose

```bash
docker compose up
```

The API will run on:

```text
http://localhost:3000
```

The database will run on:

```text
localhost:3306
```

### Option 2: Run the API Without Docker

```bash
npm install
```

```bash
npm run dev
```

## AWS Terraform Note

The `terraform/` folder contains a minimal AWS setup for deploying the app with:
- a lightweight EC2 instance
- a private MariaDB RDS database
- security groups
- IAM permissions for SSM and CloudWatch Logs
- a bootstrap script that clones the `main` branch and starts the app

For the full AWS setup details, see [terraform/README.md](terraform/README.md).
