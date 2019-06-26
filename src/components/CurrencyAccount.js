import React from "react";
import CurrencyAccountItem from "./CurrencyAccountItem";

class CurrencyAccount extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="sixteen wide column">
            <div className="ui fluid card">
              <div className="center aligned content">
                <h2>Currency Deposit Accounts Balance</h2>
              </div>
              <CurrencyAccountItem />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyAccount;
