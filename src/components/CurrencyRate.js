import React from "react";

class CurrencyRate extends React.Component {
  render() {
    const { base, currencyRate, toCurrency } = this.props;
    return (
      <div>
        <strong>{`1 ${base} = ${currencyRate} ${toCurrency}`}</strong>
      </div>
    );
  }
}

export default CurrencyRate;
