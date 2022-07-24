FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm install
COPY . /app
RUN npm run build
FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm install --only=prod
EXPOSE 3000
USER node
CMD ["node", "index.js"]