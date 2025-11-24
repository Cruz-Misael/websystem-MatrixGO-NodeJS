# Base image for a lightweight Node.js environment
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency definition files
COPY package.json package-lock.json* ./

# Install project dependencies for production
RUN npm install --production

# Copy the rest of the application source code
COPY ./src ./src

# Expose the API port
EXPOSE 3001

# Command to run the application when the container starts
CMD ["npm", "start"]