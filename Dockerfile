# Use an official Nginx image as the base
FROM nginx:stable-alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default static files
RUN rm -rf ./*

# Copy the built React app from local dist directory to Nginx's html directory
COPY dist/ /usr/share/nginx/html

# Copy custom Nginx config if needed (optional)
# COPY local/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
