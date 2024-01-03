# Use the default image to have all standard utilities included.
FROM node:16

WORKDIR /opt/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

EXPOSE 5000

# CMD "ts-node" "src/index.ts"
CMD ["npm", "start"]
