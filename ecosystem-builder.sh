#!/bin/bash
# This script will build the ecosystem.config.js file for pm2
echo "Building ecosystem.config.js"
if [ -f "ecosystem.config.js" ]
then
  rm ecosystem.config.js
  echo "ecosystem.config.js deleted"
fi

touch ecosystem.config.js

## LISTED ASSET
declare -a arr=(
"adausdt"
"atomusdt"
"batusdt"
"bchusdt"
"bnbusdt"
"btcusdt"
"dashusdt"
"eosusdt"
"etcusdt"
"ethusdt"
"iotausdt"
"linkusdt"
"ltcusdt"
"ontusdt"
"trxusdt"
"xlmusdt"
"xmrusdt"
"xrpusdt"
"xtzusdt"
"zecusdt"
)

echo  "module.exports = {
  apps: [" >> ecosystem.config.js
echo "    {
      name: 'liveness',
      script: 'engine/app.js',
      namespace: 'jetbit-exchange-funding-fee',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    }," >> ecosystem.config.js
for i in "${arr[@]}"
do
  echo "Adding $i"
  echo "    {
      name: 'jetbit-exchange-ff-$i',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=$i',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    }," >> ecosystem.config.js
done

echo  "  ],
};" >> ecosystem.config.js

echo "ecosystem.config.js created"
