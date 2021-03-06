import React from "react";

class QuickConversion extends React.Component {
  handleClick = currency => {
    console.log(`${currency} button clicked...`);
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
                  className="ui inverted grey toggle button"
                  onClick={() => this.handleClick(currency)}
                  style={{
                    fontSize: "1.2em",
                    color: "black"
                  }}
                >
                  {currency}
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
                  className="ui inverted grey toggle button"
                  onClick={() => this.handleClick(currency)}
                  style={{
                    fontSize: "1.2em",
                    color: "black"
                  }}
                >
                  {currency}
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
