
import Component from '../../core/Component';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import Card from './Card';
import CountUp from '../CountUp';
import Icon from '../Icon';

export default class CardPrice extends Component {
  static defaultProps = {
    btc: 0.0,
    volume: 0.0
  };

  static propTypes = {
    btc: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired
  };

  render() {
    return (
      <Card className="card--market" title="Market">
        <p className="card__data-main bariol">
            Price:&nbsp;
          <CountUp
            decimals={ 8 }
            duration={ 1 }
            end={ this.props.btc }
            start={ 0 }
            suffix={ ' BTC' } />
        </p>
        <p className="card__data-main bariol">
            Volume:&nbsp;
          <CountUp
            decimals={ 2 }
            duration={ 1 }
            end={ this.props.volume }
            start={ 0 }
            suffix={ ' SAP' } />
        </p>
        <p className="card__data-sub">Data from Crex24</p>
      </Card>
    );
  };
}
