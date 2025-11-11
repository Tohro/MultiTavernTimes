# Используем официальный Node образ
FROM node:20 AS builder

WORKDIR /app

# Копируем зависимости и устанавливаем
COPY Frontend/my-news-app/package*.json ./
RUN npm install

# Копируем исходники и собираем
COPY Frontend/my-news-app/ .
RUN npm run build

# Этап для отдачи статики
FROM nginx:stable-alpine

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем дефолтный конфиг nginx 
COPY Frontend/my-news-app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]