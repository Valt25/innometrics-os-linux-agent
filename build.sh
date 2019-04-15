#!/usr/bin/env bash
#Run with node installed
cd frontend;
npm install;
npm run build;
cd ..
rm -rf release
mkdir release
cp install.sh run.sh package.json release/
cp sensor/ release/ -r
cp local_server/ release/ -r
cp frontend/build/frontend\ 0.0.1.AppImage release/

