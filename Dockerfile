FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm i -g @nestjs/cli
RUN npm install
CMD ["npm", "run", "start:dev"]
