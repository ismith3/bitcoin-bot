import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col">
            <h2>BTC Trading Bot</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;