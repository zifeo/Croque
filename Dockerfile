FROM node:8-alpine

RUN mkdir -p /data
WORKDIR /data

COPY node_modules /data/node_modules
COPY build /data
COPY db /data

EXPOSE 9000
CMD [ "node", "app.js" ]