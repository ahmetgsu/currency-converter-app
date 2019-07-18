import React from "react";

class BuyButton extends React.Component {
  handleClick = () => {
    // e.preventDefault();
    const { amount, userBalance, base } = this.props;
    console.log(userBalance);
    if (userBalance.find(item => item.currency === base)) {
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
        this.props.updateCurrencyBalances(amount);
      }
    } else {
      alert(`Please create ${base} account first`);
      return;
    }
  };

  render() {
    return (
      <div className="ui right aligned container" style={{ margin: "20px" }}>
        <div className="ui header">
          <button
            className="ui green button"
            style={{
              fontSize: "1.2em"
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
