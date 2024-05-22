

FROM node:20.12.2

ENV NODE_ENV production

COPY .env .

WORKDIR /app

COPY ["package.json" , "package-lock.json","./"]

RUN npm install 

COPY . .

CMD [ "node" , "index.js" ]