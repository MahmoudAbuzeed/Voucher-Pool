FROM node:latest

WORKDIR /var/www/voucher

COPY package.json .

RUN npm install -legacy-peer-deps --force

EXPOSE 3010

CMD ["npm", "start"]

