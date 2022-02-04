FROM node:17-alpine3.12

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 8082

CMD ["yarn", "start"]