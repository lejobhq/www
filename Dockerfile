FROM node:12 as base

ARG BABEL_ENV=production

WORKDIR /usr/src/www
COPY . .

RUN npm install --no-audit
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/
COPY --from=base /usr/src/www/dist/* /usr/share/www/

EXPOSE 8080

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
