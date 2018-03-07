# Croque

[![Build Status](https://travis-ci.org/zifeo/Croque.svg?branch=master)](https://travis-ci.org/zifeo/Croque)

EPFL is a great place. Croque is an [Agepoly](https://agepoly.ch/) and [Musical](http://musical.epfl.ch/) initiative to take friendliness on the campus to the next level. Whether you don't like to eat alone, you want to meet new buddies, you're curious about people elsewhere or you're a chatty person, let's have fun and lunch together 😎 !

## Concept

Every EPFL member can register for next weekday lunch (in french, english or both). At **12.00am**, joiners will be randomly assigned to groups of 3-4 people and **receive an email** containing one campus location and first names. They should meet there at **12.15am** and decide where to go for lunch. The rest is up to them 🎉 !
(When lacking people, joiners will receive a cancellation, let's retry another day.)

There is a single rule: please show up on time or cancel yourself before the assignment, otherwise you will be banned.

## Getting started

```shell
cp .env.example .env
vim .env
yarn
yarn start dev
```

## Deployment 

```shell
git pull origin master
docker pull node:latest
docker run --rm -it -v "$(pwd):/data" node:latest /bin/sh -c 'cd /data && yarn && ./node_modules/.bin/grunt && rm -rf node_modules && yarn install --production'
docker-compose down; docker-compose up -d --build
```
