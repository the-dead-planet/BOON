# Set up the workspace, install dependencies.
FROM node:14-alpine as base

WORKDIR /opt/app/

# Only copy files required to run install.
COPY package.json .
COPY yarn.lock .

RUN yarn install

# Now copy source files. If source changes, but dependencies do not, this trick
# will make docker use a cached image of installed dependencies.
COPY . . 

# Build an optimized bundle.
FROM base as builder
RUN yarn build

# Serve built files.
FROM nginx:1.16.0-alpine

COPY --from=builder /opt/app/build/ /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d

# Below requires a folder structure in client: 
# '/client/conf/conf.d' with a file 'default.conf' with nginx config
COPY conf /etc/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
