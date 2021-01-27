FROM node:latest AS installer

RUN mkdir -p /app

WORKDIR /app

COPY yarn.lock .
COPY package.json .
COPY Gruntfile.js .

RUN yarn install --dev && ./node_modules/.bin/grunt && rm -rf node_modules && yarn install --production 

FROM node:10-alpine AS release

RUN mkdir -p /app
WORKDIR /app

COPY . .
COPY --from=installer /app/build /app/build
COPY --from=installer /app/node_modules /app/node_modules

EXPOSE 9000
CMD [ "node", "app.js" ]
