FROM nginx:latest
LABEL Name=occloxium.de Version=1.0.0

ADD .  /usr/share/nginx/html