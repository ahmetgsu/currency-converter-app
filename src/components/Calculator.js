import React from "react";

class Calculator extends React.Component {
  render() {
    const { base, toCurrency } = this.props;
    return (
      <div>
        <div className="ui grid">
          <div className="sixteen wide center aligned column">
            <div className="ui fluid icon input">
              <input
                type="text"
                placeholder={`Amount to be converted in ${base}`}
              />
            </div>
          </div>
          <div
            className="eight wide center aligned column"
            style={{
              border: "1px solid grey",
              borderRadius: "6px"
            }}
          >
            Commission rate 1%
          </div>
          <div
            className="eight wide center aligned column"
            style={{
              border: "1px solid grey",
              borderRadius: "6px"
            }}
          >
            Commission fee
          </div>
          <div
            className="sixteen wide center aligned column"
            style={{
              border: "1px solid grey",
              borderRadius: "6px",
              margin: "5px 5px 5px 5px"
            }}
          >
            Amount after commission
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
