#!/usr/bin/env bash
./node-v10.15.1-linux-x64/bin/node ./node-v10.15.1-linux-x64/bin/npm install
(cd sensor/; node index.js) &
(cd local_server/; node server.js) &
wait