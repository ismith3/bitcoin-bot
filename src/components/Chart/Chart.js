import React from 'react';
import Chart from './ChartConfig.js';
import getCandleData from '../../util.js';
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  formatData(data) {
    return data.map(candle => {
      return {
        date: new Date(candle[0] * 1000),
        open: candle[3],
        high: candle[2],
        low: candle[1],
        close: candle[4],
        volume: candle[5]
      }
    }).reverse();
  }

  render() {
    // console.log(this.props.data);
    if (!this.props.data) {
			return <div>Loading...</div>
		} else {
		return (
			<Chart type={'hybrid'} data={this.formatData(this.props.data)} />
    )
    }
  }
}

export default ChartComponent;