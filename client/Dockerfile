FROM node:20 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

# RUN envsubst < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

WORKDIR /static

COPY --from=builder /app/dist .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
