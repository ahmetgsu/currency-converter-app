import React from "react";
import { PropTypes } from "react";

class QuickConversion extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = e => {
    console.log(e.target);
    this.props.updateBaseOnClick(e.target.value);
  };

  render() {
    const majorCurrencies = ["USD", "GBP", "EUR", "JPY"];
    return (
      <div className="ui stackable four column center aligned grid">
        {majorCurrencies.map((item, index) => {
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
}

export default QuickConversion;
