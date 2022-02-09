FROM node:latest

WORKDIR /app

RUN npm install -g json-server

CMD ["json-server", "--watch", "db.json", "--port", "3001", "--host", "0.0.0.0"]


