FROM node:10 as base

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/
COPY --from=base ./dist/. /usr/share/www/

EXPOSE 8080

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
