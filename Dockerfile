FROM node:16-alpine as base
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.* ./
COPY ./src ./src
RUN npm ci
RUN npm run build:typescript
ENV PORT=8080

EXPOSE 8080
CMD ["node", "--es-module-specifier-resolution=node", "./build/server.js"]
