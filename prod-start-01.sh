#!/bin/bash

npm run link

## LISTED ASSET
declare -a arr=(
  'actusdt'
  'goldusdt'
  'btcusdt'
  'ethusdt'
  'bchusdt'
  'xrpusdt'
  'bnbusdt'
  'ltcusdt'
  'adausdt'
  'etcusdt'
  'linkusdt'
  'xlmusdt'
)

for i in "${arr[@]}"
do
./node_modules/.bin/pm2 delete fut-ff-$i

./node_modules/.bin/pm2 start engine/funding-fee/index.js --namespace=funding-fee --name=fut-ff-$i -- --assetPair=$i --periodFee=60 --periodRate=5
done

 

