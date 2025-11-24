# Etapa 1: Build Angular
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx ng build frontend-mrc --configuration production

# Etapa 2: Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/dist/frontend-mrc /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
