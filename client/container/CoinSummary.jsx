
import Actions from '../core/Actions';
import Component from '../core/Component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../component/Icon';

import CardMasternodeSummary from '../component/Card/CardMasternodeSummary';
import CardNetworkSummary from '../component/Card/CardNetworkSummary';
import CardPrice from '../component/Card/CardPrice';
import CardStatus from '../component/Card/CardStatus';
import WatchList from '../component/WatchList';

class CoinSummary extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    // State
    coins: PropTypes.array.isRequired,
    txs: PropTypes.array.isRequired,
    watch: PropTypes.array.isRequired,
    // Dispatch
    onRemove: PropTypes.func.isRequired,
  };

  render() {
    const coin = this.props.coins && this.props.coins.length
      ? this.props.coins[0]
      : { diff: 0, netHash: 0 };

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 col-lg-3">
                <CardStatus
                  blocks={ this.props.txs.length
                    ? this.props.txs[0].blockHeight
                    : coin.blocks
                  }
                  peers={ coin.peers }
                  status={ coin.status } />
              </div>
              <div className="col-md-12 col-lg-3">
                <CardPrice
                  btc={ coin.btc }
                  volume={ coin.cap } />
              </div>
              <div className="col-md-12 col-lg-3">
                <CardNetworkSummary
                  difficulty={ coin.diff }
                  hashps={ coin.netHash }
                  xAxis={ this.props.coins.map(c => c.createdAt) }
                  yAxis={ this.props.coins.map(c => c.diff ? c.diff : 0.0) } />
              </div>
              <div className="col-md-12 col-lg-3">
                <CardMasternodeSummary
                  offline={ coin.mnsOff }
                  online={ coin.mnsOn }
                  xAxis={ this.props.coins.map(c => c.createdAt) }
                  yAxis={ this.props.coins.map(c => c.mnsOn ? c.mnsOn : 0.0) } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapDispatch = dispatch => ({
  onRemove: term => Actions.removeWatch(dispatch, term)
});

const mapState = state => ({
  coins: state.coins,
  txs: state.txs,
  watch: state.watch
});

export default connect(mapState, mapDispatch)(CoinSummary);
