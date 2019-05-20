FROM node:12 as base

COPY . .
RUN npm install && cp -r node_modules src
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/
COPY --from=base ./dist/. /usr/share/www/

EXPOSE 8080

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
