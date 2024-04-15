# Base image for the React app / test
FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app directory ,.editedff
COPY . .

# Expose React development server port (default: 3000) sample]
EXPOSE 3000

# Start the development server
CMD [ "npm", "start" ]