#!/usr/bin/env bash

# rm -Rf node_modules
# npm install

profile='demo-workshop-default'

wt ls -p $profile
wt rm signup-verification -p $profile
rm -Rf build

npm run bundle
./create.sh $profile

