#!/bin/bash

# Cloud Deployment Script for Assignment 2
# Student: Vinit Kumar (21946017)

echo "🚀 Starting Cloud Deployment for Assignment 2..."
echo "📊 Student: Vinit Kumar (21946017)"

# Build Docker images
echo "🐳 Building Docker images..."
docker build -t cbwapp:latest .
docker build -f Dockerfile.enhanced -t cbwapp:enhanced .

# Tag for cloud deployment (example for AWS ECR)
echo "🏷️ Tagging images for cloud deployment..."
docker tag cbwapp:latest cbwapp/assignment2:latest
docker tag cbwapp:enhanced cbwapp/assignment2:enhanced

# Start local containers for testing
echo "🔧 Starting local containers for testing..."
docker-compose -f docker-compose.enhanced.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Health check
echo "🏥 Performing health checks..."
curl -f http://localhost:3000/api/metrics || echo "❌ Health check failed"

# Run tests
echo "🧪 Running comprehensive tests..."
npm run test:all

echo "✅ Cloud deployment preparation completed!"
echo "📦 Images ready for deployment to AWS/Azure/GCP"
echo "🔗 Local testing available at: http://localhost:3000"