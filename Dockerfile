FROM node:16-alpine

COPY . ./myapp

WORKDIR /myapp   

RUN npm install 

EXPOSE 3000

CMD [ "node", "src/index.js" ]
