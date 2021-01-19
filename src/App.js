import React from 'react';
import Header from './components/Header/Header';
import Price from './components/Price/Price.js';
import Controller from './components/Controller/Controller.js'
import Chart from './components/Chart/Chart.js';
// import getCandleData from './util';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerData: 0,
      chartData: null
    }
  }

  componentDidMount() {
    this.OpenWSConnection(this, this.updatePrice, this.updateChart);
    // getCandleData('1m').then(data => {
    //   console.log(data);
    //   this.setState({ chartData: data });
    // })
  }

  updatePrice(app, data) {
    app.setState({ tickerData: data });
  }

  updateChart(app, data) {
    console.log('update');
    app.setState({ chartData: data });
    // console.log(app.state);
  }

  OpenWSConnection(app, updatePrice, updateChart) {
    let socket = new WebSocket(ws_url, 'btc-protocol');
  

    socket.onopen = function(e) {
      console.log(subscribe_msg);
      socket.send(JSON.stringify(subscribe_msg));
    }
  
    socket.onmessage = function(event) {
      let data = JSON.parse(event.data);
      if (data.type === 'ticker') {
        updatePrice(app, data);
      } else {
        updateChart(app, data);
      }
    }
  
    // socket.onerror = function(err) {
    //   alert(`Error: ${err.message}`);
    // }
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
          <div className="row">
            <div className="col-8">
              <Chart data={this.state.chartData}></Chart>
            </div>
            <div className="col-4">

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const ws_url = 'ws://localhost:8080';

const subscribe_msg = {
  "type": "subscribe",
  "channel": "candles",
  "interval": '1m'
}

export default App;
