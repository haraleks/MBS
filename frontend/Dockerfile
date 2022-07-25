FROM node:12-alpine as builder
WORKDIR /app
COPY . /app
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm install

RUN npm run build
FROM node:12-alpine
WORKDIR /app
RUN echo $(ls -alh)
COPY --from=builder /app/build /app
COPY package.json package.json
RUN echo $(ls -alh)
RUN ls -alh
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm install --only=prod
EXPOSE 3000
USER node
CMD ["node", "index.js"]