FROM node:20-alpine
WORKDIR /app
COPY .env ./
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]