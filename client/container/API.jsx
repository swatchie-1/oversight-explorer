
import Component from '../core/Component';
import React from 'react';

import APIsection from '../component/API/APIsection';
import HorizontalRule from '../component/HorizontalRule';
import APIdata from '../component/API/APIdata';

export default class API extends Component {

  getSections = () => {
    return APIdata.map((section, idx) => {
      return <APIsection
        key={ idx }
        heading={ section.heading }
        subHeading={ section.subHeading }
        calls={ section.calls } />
    });
  };

  render() {
    return (
      <div className="api">
        <div className="api__documentation">
          <br />
          <HorizontalRule className="api__documentation-title" title="API Documentation" />
          <br />
          <div className="pr-4">
            <p className="api__intro">
             The block explorer provides an API allowing users and/or applications to retrieve information from the network without the need for a local wallet.
            </p>
            <div className="api__call-container">
              { this.getSections() }
            </div>
          </div>
        </div>
        <div className="api__detail"></div>
      </div>
    );
  };
}
