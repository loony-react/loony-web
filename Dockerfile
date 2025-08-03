# Stage 1: Build the React app using Node 18.20.5 (alpine)
FROM node:18.20.5-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build the production version
RUN npm run build

# Stage 2: Serve the app using nginx
FROM nginx:stable-alpine

# Copy built files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: Use a custom nginx config for React Router support
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
