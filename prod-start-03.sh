#!/bin/bash

npm run link

## LISTED ASSET
declare -a arr=(
  'flmusdt'
  'aaveusdt'
  'vetusdt'
  'maticusdt'
  'litusdt'
  'linausdt'
  'blzusdt'
  'belusdt'
  'axsusdt'
  'zrxusdt'
  'oceanusdt'
  'dentusdt'
  'defiusdt'
  'xmrusdt'
  'storjusdt'
  'lrcusdt'
  'chrusdt'
  'atomusdt'
  'renusdt'
  'filusdt'
  'algousdt'
  'wavesusdt'
  'nknusdt'
  'neousdt'
  'mkrusdt'
  'kncusdt'
  'icxusdt'
  'balusdt'
  'iotausdt'
  'reefusdt'
)

for i in "${arr[@]}"
do
./node_modules/.bin/pm2 delete fut-ff-$i

./node_modules/.bin/pm2 start engine/funding-fee/index.js --namespace=funding-fee --name=fut-ff-$i -- --assetPair=$i --periodFee=60 --periodRate=5
done

 

