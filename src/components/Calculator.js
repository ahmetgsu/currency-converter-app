import React from "react";

class Calculator extends React.Component {
  
  handleInputChange = (e) => {
    this.props.onInputChange(e.target.value);
  };

  converter = () => {
    const { amount, currencyRate } = this.props;
    const result = amount * currencyRate
  };

  renderContent = () => {
    const { containerSection, base, toCurrency, amount } = this.props;
    

    if (containerSection) {
      return (
        <div>
          <div className="ui grid">
            <div className="sixteen wide center aligned column">
              <div className="ui fluid icon input">
                <input
                  type="text"
                  placeholder={`Amount to be converted in ${base}`}
                  onChange={e => this.handleInputChange(e) }
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
              {`Commission rate 1%  in ${base}`}
            </div>
            <div
              className="eight wide center aligned column"
              style={{
                border: "1px solid grey",
                borderRadius: "6px"
              }}
            >
              {`Commission fee in ${base}`}
            </div>
            <div
              className="sixteen wide center aligned column"
              style={{
                border: "1px solid grey",
                borderRadius: "6px",
                margin: "5px 5px 5px 5px"
              }}
            >
              {`Amount after commission in  ${base}`}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="ui grid">
            <div className="sixteen wide center aligned column">
              <div className="ui fluid icon input">
                <input
                  type="text"
                  placeholder={`Amount to be converted in ${toCurrency}`}
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
              {`Commission rate 1% in ${toCurrency}`}
            </div>
            <div
              className="eight wide center aligned column"
              style={{
                border: "1px solid grey",
                borderRadius: "6px"
              }}
            >
              {`Commission fee in ${toCurrency}`}
            </div>
            <div
              className="sixteen wide center aligned column"
              style={{
                border: "1px solid grey",
                borderRadius: "6px",
                margin: "5px 5px 5px 5px"
              }}
            >
              {`Amount after commission in ${toCurrency}`}
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderContent()} </div>;
  }
}

export default Calculator;
