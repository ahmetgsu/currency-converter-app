import React from "react";

class Calculator extends React.Component {
  handleInputChange = e => {
    this.props.onInputChange(e.target.value);
  };

  renderContent = () => {
    const {
      containerSection,
      base,
      toCurrency,
      amount,
      currencyRate
    } = this.props;

    const commissionRate = 0.01;
    const commissionBase = (amount * commissionRate).toFixed(5);
    const amountAfterCommission = amount - commissionBase;
    const result = (amount * currencyRate).toFixed(5);
    const commissionToCurrency = commissionBase * currencyRate;
    const amountAfterCommissionToCurrency = result - commissionToCurrency;

    if (containerSection) {
      return (
        <div>
          <div className="ui grid">
            <div className="sixteen wide center aligned column">
              <div className="ui fluid icon input">
                <input
                  type="text"
                  placeholder={`Amount to be converted in ${base}`}
                  onChange={e => this.handleInputChange(e)}
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
              <span>
                <h3>{`Commission rate in ${base}`}</h3>
              </span>
              <span>
                <h3>{commissionRate}</h3>
              </span>
            </div>
            <div
              className="eight wide center aligned column"
              style={{
                border: "1px solid grey",
                borderRadius: "6px"
              }}
            >
              <span>
                <h3>{`Commission fee in ${base}`}</h3>
              </span>
              <span>
                <h3>{commissionBase}</h3>
              </span>
            </div>
            <div
              className="sixteen wide center aligned column"
              style={{
                border: "1px solid grey",
                borderRadius: "6px",
                margin: "5px 5px 5px 5px"
              }}
            >
              <span>
                <h3>{`Amount after commission in  ${base}`}</h3>
              </span>
              <span>
                <h3>{amountAfterCommission}</h3>
              </span>
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
                  disabled={true}
                  value={result}
                  style={{ fontWeight: "bolder" }}
                />
              </div>
            </div>
            <div
              className="sixteen wide center aligned column"
              style={{
                border: "1px solid grey",
                borderRadius: "6px"
              }}
            >
              <span>
                <h3>{`Commission fee in ${toCurrency}`}</h3>
              </span>
              <span>
                <h3>{commissionToCurrency}</h3>
              </span>
            </div>
            <div
              className="sixteen wide center aligned column"
              style={{
                border: "1px solid grey",
                borderRadius: "6px",
                margin: "5px 5px 5px 5px"
              }}
            >
              <span>
                <h3>{`Amount after commission in ${toCurrency}`}</h3>
              </span>
              <span>
                <h3>{amountAfterCommissionToCurrency}</h3>
              </span>
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
