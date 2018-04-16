
import blockchain from '../../../lib/blockchain';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import Card from './Card';

const CardROI = ({ coin }) => {
  const mncoins = blockchain.mncoins;
  const mns = coin.mnsOff + coin.mnsOn;
  const subsidy = blockchain.getMNSubsidy(coin.blocks, mns, coin.supply);
  const roi = blockchain.getROI(subsidy, coin.mnsOn);

  return (
    <Card>
      <div className="mb-5">
        <div className="h3">
          { coin.mnsOn } / { mns }
        </div>
        <div className="h5">
          Active/Total Masternodes
        </div>
      </div>
      <div className="mb-5">
        <div className="h3">
          { numeral(roi).format('0,0.0000') }%
        </div>
        <div className="h5">
          Estimated ROI
        </div>
      </div>
      <div className="mb-5">
        <div className="h3">
          { numeral(coin.cap * coin.btc).format('0,0.0000') } BTC
        </div>
        <div className="h5">
          Market Cap BTC
        </div>
      </div>
      <div className="mb-5">
        <div className="h3">
          { numeral(coin.cap).format('$0,0.00') }
        </div>
        <div className="h5">
          Market Cap USD
        </div>
      </div>
      <div className="mb-5">
        <div className="h3">
          { numeral(mns * mncoins).format('0,0.0000') } SAP
        </div>
        <div className="h5">
          Coins Locked
        </div>
      </div>
      <div className="mb-5">
        <div className="h3">
          { numeral(mncoins * coin.btc).format('0,0.0000') } BTC / { numeral(mncoins * coin.usd).format('$0,0.00') }
        </div>
        <div className="h5">
          Masternode Worth
        </div>
      </div>
    </Card>
  );
};

CardROI.propTypes = {
  coin: PropTypes.object.isRequired
};

export default CardROI;
