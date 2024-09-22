#!/bin/bash

# Navigate to the client directory and install dependencies
echo "Setting up frontend..."
cd client || { echo "Client directory not found!"; exit 1; }
npm install
npm run start &  # Run frontend in the background

# Navigate to the server directory and install dependencies
echo "Setting up backend..."
cd ../server || { echo "Server directory not found!"; exit 1; }
npm install

# Create .env file from example
cp .env.example .env

# Inform the user to fill in the .env file
echo "Please fill in the .env file with your credentials."

# Start the backend server
npm run server