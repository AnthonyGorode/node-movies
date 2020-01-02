FROM node:12.13.0

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm install -g nodemon && npm install && npm cache clean --force

CMD nodemon app.js



