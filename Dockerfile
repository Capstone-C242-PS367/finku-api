FROM node:22.11.0

WORKDIR /app

ENV PORT=8080

ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
