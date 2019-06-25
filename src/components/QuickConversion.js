import React from "react";

class QuickConversion extends React.Component {
  handleClick = e => {
    this.props.updateBaseOnClick(e);
  };

  renderContent = () => {
    const { containerSection } = this.props;
    const majorCurrenciesFrom = ["USD", "GBP", "EUR", "JPY"];
    const majorCurrenciesTo = ["EUR", "JPY", "USD", "CAD"];

    if (containerSection) {
      return (
        <div className="ui stackable four column center aligned grid">
          {majorCurrenciesFrom.map((item, index) => {
            return (
              <div key={index} className="column">
                <button
                  key={index}
                  className="ui button"
                  onClick={() => this.handleClick({ item })}
                >
                  <strong>{item}</strong>
                </button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="ui stackable four column center aligned grid">
          {majorCurrenciesTo.map((item, index) => {
            return (
              <div key={index} className="column">
                <button
                  key={index}
                  className="ui button"
                  onClick={e => this.handleClick(e)}
                >
                  <strong>{item}</strong>
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default QuickConversion;
