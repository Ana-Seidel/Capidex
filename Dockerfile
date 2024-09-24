FROM node:alpine

#Para instalar o sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /usr/app

COPY  package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]