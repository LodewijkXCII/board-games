# Dockerfile for backend (Node.js)
FROM node:20

WORKDIR /app

USER node

COPY package*.json ./
RUN chown -R node:node ./node_modules &&  npm install -g npm@10.9 && npm install

COPY . .

EXPOSE 5000


CMD ["/bin/sh", "entrypoint.sh"]