import React from "react";

class CurrencyRate extends React.Component {
  renderContent = () => {
    const { base, currencyRate, toCurrency } = this.props;
    if (base === toCurrency) {
      return (
        <div>
          <strong>{`1 ${base} = 1.00000 ${toCurrency}`}</strong>
        </div>
      );
    } else {
      return (
        <div>
          <strong>{`1 ${base} = ${currencyRate} ${toCurrency}`}</strong>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default CurrencyRate;
