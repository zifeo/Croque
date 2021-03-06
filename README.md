# Croque

[![Build Status](https://travis-ci.org/zifeo/Croque.svg?branch=master)](https://travis-ci.org/zifeo/Croque)

EPFL is a great place. Croque is an initiative to bring up more friendly, unexpected and surprising encounters on the campus. Whether you don't like to eat alone, you want to meet new buddies, you're curious about people elsewhere or you're a chatty one, let's have lunch and fun together 😎 !

## Concept

Every EPFL member can register for the next Tuesday or Thursday lunch (in french, english or both). At **11.30AM**, joiners will be randomly assigned to groups of 3-4 people and **receive an email** containing a campus location and participants’ first names. They should meet there at **12.10PM** and decide where to go for lunch. The rest is up to them 🎉 !
(In case of a lack of people, meetings will be postponed by email.)

## Getting started

```shell
cp .env.example .env
vim .env
yarn
yarn start dev
```

Tequila login might enforce the usage of corresponding VPN to work. In this case, the login redirect might get stuck on `https://localhost:9000/...`, just change the url to `http://localhost:9000/...`.

## Deployment 

```shell
git pull origin master
docker pull node:latest
docker run --rm -it -v "$(pwd):/data" node:latest /bin/sh -c 'cd /data && yarn && ./node_modules/.bin/grunt && rm -rf node_modules && yarn install --production'
docker-compose down; docker-compose up -d --build
```

## License

Croque project is licensed [Apache 2.0](./LICENSE), however EPFL related elements are own by EPFL under appropriate copyright.
