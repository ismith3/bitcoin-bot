import superagent from 'superagent';

function getCandleData(interval) {
  let now = new Date();

  // 1 min
  let oneMinStart = new Date();
  oneMinStart.setMinutes(oneMinStart.getMinutes() - 120);
  
  // 5 min
  let fiveMinStart = new Date();
  fiveMinStart.setMinutes(fiveMinStart.getMinutes() - 1500);
  
  // 15 min
  let fifteenMinStart = new Date();
  fifteenMinStart.setMinutes(fifteenMinStart.getMinutes() - 4500);
  
  // 1 hr
  let hrStart = new Date();
  hrStart.setMinutes(hrStart.getMinutes() - 18000);
  
  // 6 hr
  let sixHrStart = new Date();
  sixHrStart.setMinutes(sixHrStart.getMinutes() - 108000);
  
  // 1 day
  let dayStart = new Date();
  dayStart.setMinutes(dayStart.getMinutes() - 432000);
  
  let params = [
    {
      interval: "1m",
      start: oneMinStart,
      end: now,
      granularity: 60,
    }
  ]

  function formatData(data) {
    return data.body.map(candle => {
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

  function fetchData(start, end, granularity) {
    return superagent
    .get('https://api.pro.coinbase.com/products/BTC-USD/candles')
    .query({ start: start, end: end, granularity: granularity })
  }

  for(const obj of params) {
    if(obj.interval === interval) {
      return fetchData(obj.start, obj.end, obj.granularity).then(data => formatData(data));
    }
  }
}

export default getCandleData;