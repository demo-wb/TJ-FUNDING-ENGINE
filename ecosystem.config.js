module.exports = {
  apps: [
    {
      name: 'liveness',
      script: 'engine/app.js',
      namespace: 'jetbit-exchange-funding-fee',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jetbit-exchange-ff-adausdt',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=adausdt',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jetbit-exchange-ff-btcusdt',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=btcusdt',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jetbit-exchange-ff-bchusdt',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=bchusdt',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jetbit-exchange-ff-bnbusdt',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=bnbusdt',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jetbit-exchange-ff-ethusdt',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=ethusdt',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jetbit-exchange-ff-ltcusdt',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=ltcusdt',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jetbit-exchange-ff-xrpusdt',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=xrpusdt',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jetbit-exchange-ff-xlmusdt',
      script: 'engine/funding-fee/index.js',
      args: '--assetPair=xlmusdt',
      namespace: 'jetbit-exchange-ff',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
