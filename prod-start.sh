#!/bin/bash

npm run link

./node_modules/.bin/pm2 delete fut-ff

./node_modules/.bin/pm2 start engine/funding-fee/v2/index.js --namespace=fut-ff --name=fut-funding-fee
