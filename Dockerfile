#--------------------------------------------------------------------------
# Dockerfile: build Docker Image Ionic Vue Template
#--------------------------------------------------------------------------

# Step 1: build ionic-vue project
FROM node:14.15.3-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: create nginx server
FROM nginx:1.19.0-alpine AS prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

