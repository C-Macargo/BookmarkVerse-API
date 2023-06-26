FROM node:16.17.0

WORKDIR /usr/src

COPY . .

EXPOSE 5000

RUN npm i

RUN npm run build

CMD ["npm", "start"]