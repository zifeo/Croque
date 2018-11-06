#!/usr/bin/env bash

docker pull node:latest && \
    docker run --rm -it -v $(pwd):/data node:latest /bin/sh -c 'cd /data && yarn && ./node_modules/.bin/grunt && rm -rf node_modules && yarn install --production' && \
    docker-compose down && \
    docker-compose up -d --build
