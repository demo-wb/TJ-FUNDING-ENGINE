const { expect } = require('chai');
const Service = require('engine/funding-fee/v1/service');

describe('[UNIT] - CALCULATE FUNDING FEE', () => {
  it('FUNDING RATE IS POSITIVE, LONGS PAY SHORTS', () => {
    const mockTest = [
      {
        fundingRate: 0.0001,
        markPrice: 29400.66,
        assetStatusId: '292c9c27-92d2-4a67-81a5-67048f63268a',
        openPosition: [
          {
            user_id: '9e2da588-867f-4d40-9fab-e73c679ec974',
            quote_asset: 'usdt',
            base_asset: 'btc',
            current_quantity: 1,
            side_value: 1, // Long Position
          },
          {
            user_id: '9e2da588-867f-4d40-9fab-e73c679ec974',
            quote_asset: 'usdt',
            base_asset: 'btc',
            current_quantity: 0.004,
            side_value: 1, // Long Position
          },
          {
            user_id: '9e2da588-867f-4d40-9fab-e73c679ec974',
            quote_asset: 'usdt',
            base_asset: 'btc',
            current_quantity: 0.008,
            side_value: -1, // Short Position
          },
        ],
        expect: [
          { // Longs Pay Shorts
            amount: -2.94006600,
            amount_before_deduct_fee: -2.94006600,
            base_asset: 'btc',
            quote_asset: 'usdt',
            tx_type: 'funding_fee',
            status: 'approved',
            asset_status_id: '292c9c27-92d2-4a67-81a5-67048f63268a',
          },
          {
            amount: -0.01176027,
            amount_before_deduct_fee: -0.01176027,
            base_asset: 'btc',
            quote_asset: 'usdt',
            tx_type: 'funding_fee',
            status: 'approved',
            asset_status_id: '292c9c27-92d2-4a67-81a5-67048f63268a',
          },
          {
            amount: 0.02352053,
            amount_before_deduct_fee: 0.02352053,
            base_asset: 'btc',
            quote_asset: 'usdt',
            tx_type: 'funding_fee',
            status: 'approved',
            asset_status_id: '292c9c27-92d2-4a67-81a5-67048f63268a',
          },
        ],
      },
    ];

    for (let i = 0; i < mockTest.length; i += 1) {
      const mockTestElement = mockTest[i];

      const result = Service.calculateFundingFee(
        mockTestElement.fundingRate,
        mockTestElement.markPrice,
        mockTestElement.assetStatusId,
        mockTestElement.openPosition,
      );

      for (let j = 0; j < result.length; j += 1) {
        expect(result[j].amount).to.equal(mockTestElement.expect[j].amount);
        expect(result[j].base_asset).to.equal(mockTestElement.expect[j].base_asset);
        expect(result[j].quote_asset).to.equal(mockTestElement.expect[j].quote_asset);
        expect(result[j].tx_type).to.equal(mockTestElement.expect[j].tx_type);
        expect(result[j].status).to.equal(mockTestElement.expect[j].status);
        expect(result[j].asset_status_id).to.equal(mockTestElement.expect[j].asset_status_id);
        expect(result[j].amount_before_deduct_fee).to.equal(
          mockTestElement.expect[j].amount_before_deduct_fee,
        );
      }
    }
  });
  it('FUNDING RATE IS NEGATIVE, SHORTS PAY LONGS', () => {
    const mockTest = [
      {
        fundingRate: -0.000068,
        markPrice: 29400.66,
        assetStatusId: '292c9c27-92d2-4a67-81a5-67048f63268a',
        openPosition: [
          {
            user_id: '9e2da588-867f-4d40-9fab-e73c679ec974',
            quote_asset: 'usdt',
            base_asset: 'btc',
            current_quantity: 0.004,
            side_value: 1, // Long Position
          },
          {
            user_id: '9e2da588-867f-4d40-9fab-e73c679ec974',
            quote_asset: 'usdt',
            base_asset: 'btc',
            current_quantity: 0.008,
            side_value: -1, // Short Position
          },
        ],
        expect: [
          { // Shorts Pay Longs
            amount: 0.00799698,
            amount_before_deduct_fee: 0.00799698,
            base_asset: 'btc',
            quote_asset: 'usdt',
            tx_type: 'funding_fee',
            status: 'approved',
            asset_status_id: '292c9c27-92d2-4a67-81a5-67048f63268a',
          },
          {
            amount: -0.01599396,
            amount_before_deduct_fee: -0.01599396,
            base_asset: 'btc',
            quote_asset: 'usdt',
            tx_type: 'funding_fee',
            status: 'approved',
            asset_status_id: '292c9c27-92d2-4a67-81a5-67048f63268a',
          },
        ],
      },
    ];

    for (let i = 0; i < mockTest.length; i += 1) {
      const mockTestElement = mockTest[i];

      const result = Service.calculateFundingFee(
        mockTestElement.fundingRate,
        mockTestElement.markPrice,
        mockTestElement.assetStatusId,
        mockTestElement.openPosition,
      );

      for (let j = 0; j < result.length; j += 1) {
        expect(result[j].amount).to.equal(mockTestElement.expect[j].amount);
        expect(result[j].base_asset).to.equal(mockTestElement.expect[j].base_asset);
        expect(result[j].quote_asset).to.equal(mockTestElement.expect[j].quote_asset);
        expect(result[j].tx_type).to.equal(mockTestElement.expect[j].tx_type);
        expect(result[j].status).to.equal(mockTestElement.expect[j].status);
        expect(result[j].asset_status_id).to.equal(mockTestElement.expect[j].asset_status_id);
        expect(result[j].amount_before_deduct_fee).to.equal(
          mockTestElement.expect[j].amount_before_deduct_fee,
        );
      }
    }
  });
});
