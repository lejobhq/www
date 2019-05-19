FROM node:10 as base
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/
COPY --from=base ./build/. /usr/share/www/

EXPOSE 8080

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
