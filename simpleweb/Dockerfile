#node version of the alpine image
FROM node:alpine

WORKDIR D:\Resources\microservice_tute\simpleweb


COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm","start" ]
