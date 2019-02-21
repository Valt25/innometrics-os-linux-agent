#!/usr/bin/env bash
(cd sensor/; node index.js) &
(cd local_server/; node server.js) &
wait