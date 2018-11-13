import React, { Component } from 'react';
import Select from 'react-opium-select';
import 'react-opium-select/style.css';

class App extends Component {
  render() {
    const settings = {
      style: {
        background: '#000000',
        borderColor: '#adadad',
        borderRadius: 5,
        borderWidth: 1,
        padding: '5px 10px',
        textColor: '#adadad'
      },
    };

    return (
      <div className="select">
        <Select
          { ...this.props }
          settings={ settings } />
      </div>
    );
  }
}

export default App;
