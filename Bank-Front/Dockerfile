FROM node:18.13.0 

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

CMD ["ng", "serve"]