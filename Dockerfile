# Dockerfile

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]