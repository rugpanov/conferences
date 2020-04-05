FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm ci && npm run build

EXPOSE 9000
CMD ["node", "dist/main.js"]
