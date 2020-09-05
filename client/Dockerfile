FROM node:11.5.0 as builder

WORKDIR /opt/app/
ADD ./ /opt/app/

RUN npm install && \
    npm run build


# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.16.0-alpine

COPY --from=builder /opt/app/build/ /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]