import React from 'react';

import { scaleTime } from "d3-scale";
import { utcDay, utcMinute } from "d3-time";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

class CandleStickChart extends React.Component {
  render() {
    const { type, width, data, ratio } = this.props;
    const xAccessor = d => d.date;
		const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[data.length - 30])
    ];
    
    return (
      <ChartCanvas height={300}
        ratio={ratio}
        width={1000}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        seriesName="BTC"
				data={data}
        xAccessor={xAccessor}
        displayXAccessor={xAccessor}
				xScale={scaleTime()}
				xExtents={xExtents}
        panEvent={true}
        zoomEvent={true}>
        

        <Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={12} stroke={"rgb(210,210,210)"} tickStroke="rgb(210,210,210)"/>
					<YAxis axisAt="left" orient="left" ticks={8} stroke={"rgb(210,210,210)"} tickStroke="rgb(210,210,210)"/>
					<CandlestickSeries
						stroke={d => d.close > d.open ? "#35ff11" : "#ff4242"}
						wickStroke={d => d.close > d.open ? "#35ff11" : "#ff4242"}
            fill={d => d.close > d.open ? "#35ff11" : "#ff4242"}
            width={timeIntervalBarWidth(utcMinute)}/>
				</Chart>
      </ChartCanvas>
    );
  }
}

CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;