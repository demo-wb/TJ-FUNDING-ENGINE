#!/bin/bash

npm run link

## LISTED ASSET
declare -a arr=(
  'alphausdt'
  'yfiusdt'
  'ognusdt'
  'crvusdt'
  'ckbusdt'
  'chzusdt'
  'ontusdt'
  'sandusdt'
  'rvnusdt'
  'rlcusdt'
  'dotusdt'
  'xtzusdt'
  'thetausdt'
  'manausdt'
  'compusdt'
  'trxusdt'
  'sklusdt'
  'grtusdt'
  'aliceusdt'
  'xemusdt'
  'omgusdt'
  'dogeusdt'
  'celrusdt'
  'bandusdt'
  'batusdt'
  'rsrusdt'
  'ftmusdt'
)

for i in "${arr[@]}"
do
./node_modules/.bin/pm2 delete fut-ff-$i

./node_modules/.bin/pm2 start engine/funding-fee/index.js --namespace=funding-fee --name=fut-ff-$i -- --assetPair=$i --periodFee=60 --periodRate=5
done

 

