# Pull in the official base image for Node.js
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json into the root directory
COPY package*.json ./

# Install application dependencies including devDependencies
RUN npm install

# Bundle the source code inside the Docker image
COPY . .

# The application listens on port 8080, so expose this port
EXPOSE 8080

# Define the command to run the application
CMD [ "npm", "run", "start" ]