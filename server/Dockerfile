FROM node:12.14.0

WORKDIR /opt/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

EXPOSE 5000

# CMD "ts-node" "src/index.js"
CMD ["npm", "start"]