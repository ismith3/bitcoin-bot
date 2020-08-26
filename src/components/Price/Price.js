import React from 'react';

class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.price
    }
  }

  render() {
    let formattedPrice;

    if(this.props.price) {
      formattedPrice = String(Number(this.props.price).toFixed(2)).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,');
    } else {
      formattedPrice = Number(0).toFixed(2);
    }
    


    return (
      <p className="price">{'$' + (formattedPrice) + ' USD'}</p>
    )
  }
}

export default Price;