#!/usr/bin/env bash
wget -qO- https://nodejs.org/dist/v10.15.1/node-v10.15.1-linux-x64.tar.xz | tar xfJ -
./node-v10.15.1-linux-x64/bin/node ./node-v10.15.1-linux-x64/bin/npm install
cd ./local_server/
./node_modules/.bin/sequelize db:migrate
