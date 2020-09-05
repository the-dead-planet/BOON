FROM node

WORKDIR /server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

EXPOSE 5000

CMD "node" "src/index.js"