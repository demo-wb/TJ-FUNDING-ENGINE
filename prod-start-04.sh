#!/bin/bash

npm run link

## LISTED ASSET
declare -a arr=(
  'qtumusdt'
  'egldusdt'
  'eosusdt'
  'sushiusdt'
  'solusdt'
  'snxusdt'
  'kavausdt'
  'iostusdt'
  'hbarusdt'
  '1inchusdt'
  'uniusdt'
  'nearusdt'
  'mtlusdt'
  'cotiusdt'
  'dashusdt'
  'stmxusdt'
  'ksmusdt'
  'avaxusdt'
  'zilusdt'
  'oneusdt'
  'enjusdt'
  'zecusdt'
  'unfiusdt'
  'trbusdt'
  'sxpusdt'
  'sfpusdt'
  'runeusdt'
  'hotusdt'
  'ankrusdt'
  'zenusdt'
)

for i in "${arr[@]}"
do
./node_modules/.bin/pm2 delete fut-ff-$i

./node_modules/.bin/pm2 start engine/funding-fee/index.js --namespace=funding-fee --name=fut-ff-$i -- --assetPair=$i --periodFee=60 --periodRate=5
done

 

