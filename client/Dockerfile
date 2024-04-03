FROM node:21.5.0

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . /app

EXPOSE 3001

CMD ["npm", "start"]
