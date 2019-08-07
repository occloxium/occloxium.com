# 1st stage build client
FROM node:latest as builder
# copy package-lock.json (mainly) and package.json
COPY /client/package*.json ./
# npm ci for better performance in dependency resolution
RUN npm ci
# bundle client
COPY /client /
# build with webpack
RUN npm run build

# 2nd stage: lightweight alpine container
FROM nginx:alpine

RUN rm /etc/nginx/sites-available/default

COPY nginx.conf /etc/nginx/sites-available/default

RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

COPY --from=builder /dist /usr/share/nginx/html/

RUN ls /usr/share/nginx/html