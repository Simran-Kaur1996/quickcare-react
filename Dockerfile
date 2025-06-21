# Step 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy all source code and build
COPY . .
RUN npm run build

# Step 2: Serve app with Nginx
FROM nginx:alpine

# Copy build output to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

