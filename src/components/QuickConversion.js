import React from "react";

class QuickConversion extends React.Component {
  handleClick = currency => {
    console.log(currency);
    if (this.props.containerSection) {
      this.props.updateBase(currency);
    } else {
      this.props.updateToCurrency(currency);
    }
  };

  renderContent = () => {
    const { containerSection } = this.props;
    const majorCurrenciesFrom = ["USD", "GBP", "EUR", "JPY"];
    const majorCurrenciesTo = ["EUR", "JPY", "USD", "CAD"];

    if (containerSection) {
      return (
        <div className="ui stackable four column center aligned grid">
          {majorCurrenciesFrom.map((currency, index) => {
            return (
              <div key={index} className="column">
                <button
                  key={index}
                  className="ui button"
                  onClick={() => this.handleClick(currency)}
                >
                  <strong>{currency}</strong>
                </button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="ui stackable four column center aligned grid">
          {majorCurrenciesTo.map((currency, index) => {
            return (
              <div key={index} className="column">
                <button
                  key={index}
                  className="ui button"
                  onClick={() => this.handleClick(currency)}
                >
                  <strong>{currency}</strong>
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };

  render() {
    // console.log(this.props);
    return <div>{this.renderContent()}</div>;
  }
}

export default QuickConversion;
