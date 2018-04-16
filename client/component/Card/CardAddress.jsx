
import Component from '../../core/Component';
import { dateFormat } from '../../../lib/date';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import qrcode from 'qrcode';
import React from 'react';

export default class CardAddress extends Component {
  static defaultProps = {
    address: '',
    txs: [],
    utxo: []
  };

  static propTypes = {
    address: PropTypes.string.isRequired,
    txs: PropTypes.array.isRequired,
    utxo: PropTypes.array.isRequired
  };

  componentDidMount() {
    if (!!this.props.address) {
      this.drawQRCode();
    }
  };

  componentDidUpdate(prevProps) {
    if (!!this.props.address
      && this.props.address !== prevProps.address) {
      this.drawQRCode();
    }
  };

  drawQRCode = () => {
    const el = document.getElementById('qr-code');
    qrcode.toCanvas(el, this.props.address, { width: 220 }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  render() {
    let trecv = 0;
    let tsend = 0;

    const values = this.props.utxo.map(tx => tx.value);
    const balance = values.length
      ? values.reduce((acc, val) => acc + val)
      : 0;

    // Generate sent and received, we can get sent
    // by taking the total tx value minus balance.
    let recv = 0;
    this.props.txs.forEach((tx) => {
      tx.vout.forEach((vout) => {
        if (vout.address === this.props.address) {
          recv += vout.value;
        }
      });
    });

    return (
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <div className="card--address">
            <div className="card__row">
              <span className="card__label card--address-wallet">
                Wallet Address:
              </span>
              <span className="card__result card--address-hash">
                { this.props.address }
              </span>
            </div>
            <div className="card__row">
              <span className="card__label">
                Sent:
              </span>
              <span className="card__result">
                { numeral(recv - balance).format('0,0.0000') } SAP
              </span>
            </div>
            <div className="card__row">
              <span className="card__label">
                Received:
              </span>
              <span className="card__result">
                { numeral(recv).format('0,0.0000') } SAP
              </span>
            </div>
            <div className="card__row">
              <span className="card__label">
                Balance:
              </span>
              <span className="card__result">
                { numeral(balance).format('0,0.0000') } SAP
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4 text-right">
          <canvas id="qr-code" />
        </div>
      </div>
    );
  };
}
