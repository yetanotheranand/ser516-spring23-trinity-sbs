## Stage 1: Build
# Use Node slim image
FROM node:18.15.0-slim AS dev
# Configurable argument
ARG ENVIRONMENT=production
# Make /app as working directory
WORKDIR /app
# Copy package.json file
COPY package.json package-lock.json ./
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
## Comment out the other npm install, if using this
# RUN npm install && mv ./node_modules ./
# Install dependencies
RUN npm install --silent
# Copy the source code to the /app directory
COPY . .
# Test the application before building it
# RUN npm run test
# Build the application and store the artifacts in dist folder
RUN npm run build --output-path=dist --configuration=$ENVIRONMENT
# During development application is accessible at port 4200
EXPOSE 4200
# Serve the files with live reload
CMD ["npm", "start"]

## Stage 2: Serve
FROM nginx:1.23.3-alpine-slim
# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
# Copy nginx config file
COPY --from=dev /app/nginx/nginx.conf /etc/nginx/nginx.conf
# Copy dist folder from the build stage to nginx public folder
COPY --from=dev /app/dist/ui /usr/share/nginx/html
# Nginx is serving on port 80
EXPOSE 80
# Start Nginx service
CMD ["nginx", "-g", "daemon off;"]
