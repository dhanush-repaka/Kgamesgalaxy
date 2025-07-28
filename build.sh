#!/bin/bash

# Build script for Netlify deployment
echo "Starting Karthikeya Games Galaxy build..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
yarn install

# Build the React app
echo "Building React application..."
yarn build

# Copy build to root for Netlify
echo "Preparing build for deployment..."
cp -r build/* ../

echo "Build completed successfully!"