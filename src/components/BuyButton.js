import React from "react";

class BuyButton extends React.Component {
  handleClick = () => {
    // e.preventDefault();
    const { amount, userBalance, base } = this.props;
    if (
      Number(amount) >
      Number(userBalance.find(item => item.currency === base).value)
    ) {
      alert(`Not enough money to buy selected currency...`);
      return;
    }
    if (amount <= 0) {
      alert(`Please enter a positive amount...`);
      return;
    } else {
      console.log("Calculation will be added soon...");
      this.props.updateCurrencyBalances(amount);
    }
  };

  render() {
    return (
      <div className="ui right aligned container" style={{ margin: "20px" }}>
        <div className="ui header">
          <button
            className="ui positive basic button"
            style={{
              fontSize: "1em"
            }}
            onClick={() => this.handleClick()}
          >
            Buy
          </button>
        </div>
      </div>
    );
  }
}

export default BuyButton;
