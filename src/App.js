import React from 'react';
import Header from './components/Header/Header';
import Price from './components/Price/Price.js';
import Controller from './components/Controller/Controller.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerData: 0
    }
  }

  componentWillMount() {
    this.OpenWSConnection(this, this.updatePrice);
  }

  updatePrice(app, data) {
    app.setState({ tickerData: data });
  }

  OpenWSConnection(app, updatePrice) {
    let socket = new WebSocket(base_ws_url);
  
    socket.onopen = function(e) {
      socket.send(JSON.stringify(ticker_subscribe_msg));
    }
  
    socket.onmessage = function(event) {
      let data = JSON.parse(event.data);
      if (data.type === 'ticker') {
        updatePrice(app, data);
      }
    }
  
    socket.onerror = function(err) {
      alert(`Error: ${err.message}`);
    }
  }
  
  render() {
    return (
      <div>
        <Header />
        <div className="container-md">
          <div className="row align-items-center price-row">
            <div className="col-lg">
              <Price price={this.state.tickerData.price}/>
            </div>
            <div className="col-md-auto">
              <Controller />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const base_ws_url = 'wss://ws-feed.pro.coinbase.com';

const ticker_subscribe_msg = {
  "type": "subscribe",
  "channels": [
      {
          "name": "ticker",
          "product_ids": [
              "BTC-USD"
          ]
      }
  ]
}

export default App;
