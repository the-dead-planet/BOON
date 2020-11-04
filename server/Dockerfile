FROM node:14-alpine

WORKDIR /opt/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

EXPOSE 5000

# CMD "ts-node" "src/index.js"
CMD ["npm", "start"]
