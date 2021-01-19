import React from 'react';

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      strategy: null,
      startEnabled: true,
    }
    this.handleStrategyChange = this.handleStrategyChange.bind(this);
  }

  handleStrategyChange(event) {
    let newValue;
    if(event.target.value === '-- Select Strategy --') {
      newValue = null
    } else {
      newValue = event.target.value
    }
    this.setState({ strategy: newValue });
  }

  render() {
    return (
      <div className="row align-items-center">
        <div className="col-5">
          <select defaultValue="-- Select Strategy --" onChange={this.handleStrategyChange}>
            <option disabled>-- Select Strategy --</option>
            <option>Support/Resistance</option>
          </select>
        </div>
        <div className="col-4">
          <button className="start-button">Start</button>
        </div>
        <div className="col">
          <button className="stop-button">Stop</button>
        </div>
      </div>
      
    )
  }
}

export default Controller;