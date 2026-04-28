# FUTURES-FUNDING-FEE-SERVICE.

### Description

This project is a Futures Funding Fee, A Futures Funding Fee functions as follows: 
Firstly, This service going to feed funding rate every 5 sec 
Secondly, This service going to calculate funding fee every 8 hour for opened position

## Contribution Guidelines
### Required

- Nodejs - version 20 or newer
- WowBit Exchange Database

### Instructions

- Clone this repository
- Add Environment in .env such as port, database connection, sentry dsn and etc.
- Run `yarn install`
- Run `yarn run link`

## To Run "Futures Funding Fee".

- `yarn dev --assetPair={{assetPair}} --periodFee={{periodFee}} --periodRate={{periodRate}}` 
- `yarn dev:v2 --periodFee={{periodFee}} --periodRate={{periodRate}}` 

-- assetPair: is futures assetPair symbol in lowercase such as btcusdt, bchusdt, bnbusdt, etc.
-- periodFee: is period of interval time(s) of calculate funding fee (default is 60)
-- periodRate: is period of interval time(s) of feed funding rate(default is 5)

#### Note: Always add readme.md to describe about your project.