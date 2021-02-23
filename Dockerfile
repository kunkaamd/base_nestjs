FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm i -g @nestjs/cli
RUN npm install
RUN npm install -g ts-node
RUN npm install bcrypt
CMD ["npm", "run", "start:debug"]
