FROM node:9.11.2-alpine AS build

WORKDIR /home/node/app

COPY ./package.json ./


COPY  . .
RUN npm install && npm install -g bower grunt
RUN bower install --allow-root 
RUN grunt --force
RUN grunt dev --force
RUN apk update && apk add git 
RUN bower list --allow-root

FROM nginx:1.15.0-alpine

EXPOSE 8083

COPY --from=build /home/node/app/ /usr/share/nginx/html
COPY assets/nginx.conf /etc/nginx/
