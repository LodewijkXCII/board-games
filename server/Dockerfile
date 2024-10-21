# Dockerfile for backend (Node.js)
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN  npm install -g npm@10.9 && npm install

COPY . .

EXPOSE 5000


CMD ["/bin/sh", "entrypoint.sh"]


