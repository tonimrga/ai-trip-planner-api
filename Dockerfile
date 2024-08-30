from node:alpine

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

RUN npm run build

CMD ["npm", "start"]