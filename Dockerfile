FROM node:9.11.2-alpine AS build

WORKDIR /home/node/app

COPY ./package.json ./

COPY  . .

RUN apk update && \
apk add git && \
npm install && npm install -g bower grunt && \
bower install --allow-root && \
grunt --force && \
grunt dev --force && \
bower list --allow-root

FROM nginx:1.15.0-alpine

EXPOSE 8084

COPY --from=build /home/node/app/ /usr/share/nginx/html
COPY assets/nginx.conf /etc/nginx/
