import React from "react";
import SearchCurrency from "./SearchCurrency";
import CurrencyRate from "./CurrencyRate";
import QuickConversion from "./QuickConversion";
import Calculator from "./Calculator";
import BuyButton from "./BuyButton";
import CurrencyAccount from "./CurrencyAccount";

import axios from "axios";
// import Country from "./Country";

class App extends React.Component {
  state = {
    base: "USD",
    amount: null,
    toCurrency: "EUR",
    currencies: [],
    containerSection: "left",
    userBalance: [{ currency: "USD", value: 1000 }]
  };

  componentDidMount() {
    this.getBaseCurrencyData();
    console.log(`App component is mounted`);
  }

  updateBase = currency => {
    this.setState({ base: currency }, () => {
      this.getBaseCurrencyData();
    });
  };

  updateToCurrency = currency => {
    this.setState({ toCurrency: currency }, () => {
      this.getBaseCurrencyData();
    });
  };

  onInputChange = value => {
    console.log(value);
    this.setState({ amount: value });
  };

  //This function is called in BuyButton component by onClick event
  updateCurrencyBalances = sum => {
    console.log(sum);

    const { base, amount, toCurrency, userBalance, currencyRate } = this.state;
    const commissionRate = 0.01;
    const commissionBase = Number((amount * commissionRate).toFixed(2));
    // const amountAfterCommission = Number((amount - commissionBase).toFixed(2));
    const result = Number((amount * currencyRate).toFixed(2));
    const commissionToCurrency = Number(
      (commissionBase * currencyRate).toFixed(2)
    );
    const amountAfterCommissionToCurrency = Number(
      (result - commissionToCurrency).toFixed(2)
    );

    const updateBalance = (
      currentBalance,
      baseCurrency,
      currencyTo,
      amount,
      buyedAmount
    ) => {
      console.log(buyedAmount);
      const checkBaseBalance = currentBalance.find(
        item => item.currency === baseCurrency
      );
      const checkToBalance = currentBalance.find(
        item => item.currency === currencyTo
      );
      console.log(checkBaseBalance, checkToBalance);
      let newCurrency;
      let balanceToUpdate;
      // This block checks if the initial endowment has selected baseCurrency
      if (!checkBaseBalance) {
        alert(`Please create ${baseCurrency} account first`);
        balanceToUpdate = currentBalance;
        // Control point before 1st buy
      } else if (currentBalance.length === 1) {
        newCurrency = [{ currency: currencyTo, value: buyedAmount }];
        balanceToUpdate = [...currentBalance, ...newCurrency];
      } else {
        // When there are more than 1 account, it checks...
        if (checkToBalance) {
          // ..if selected currency to buy is in userBalance
          balanceToUpdate = currentBalance;
          const existingObject = balanceToUpdate.find(
            item => item.currency === currencyTo
          );
          existingObject.value += buyedAmount;
          console.log(balanceToUpdate);
        } else {
          // ....if selected currency to buy is NOT in userBalance
          newCurrency = [{ currency: currencyTo, value: buyedAmount }];
          balanceToUpdate = [...currentBalance, ...newCurrency];
          console.log(currentBalance, balanceToUpdate);
        }
      }
      return balanceToUpdate.map(item => {
        if (item.currency === baseCurrency) {
          return { currency: baseCurrency, value: item.value - amount };
        }
        if (item.currency === currencyTo) {
          return {
            currency: currencyTo,
            value: item.value
          };
        } else {
          return { currency: item.currency, value: item.value };
        }
      });
    };

    this.setState({
      userBalance: updateBalance(
        userBalance,
        base,
        toCurrency,
        amount,
        amountAfterCommissionToCurrency
      )
    });
  };

  getBaseCurrencyData = () => {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => {
        // console.log(res.data.rates[this.state.toCurrency]);
        const currencyRate = res.data.rates[this.state.toCurrency].toFixed(5);
        const currencyRateInverted = (1 / currencyRate).toFixed(5);
        const transactionDate = res.data.date;

        this.setState({
          currencyRate,
          transactionDate,
          currencyRateInverted
        });

        const currencyArr = [];
        for (const item in res.data.rates) {
          currencyArr.push(item);
        }
        this.setState({ currencies: currencyArr.sort() });
      })
      .catch(err => {
        console.log("Opps", err.message);
      });
  };

  render() {
    console.log("state", this.state);
    return (
      <div>
        <div>
          <div
            className="ui center aligned container"
            style={{ margin: "20px" }}
          >
            <div className="ui header">
              <h1>Currency Converter</h1>
            </div>
          </div>
        </div>
        <div>
          <div
            className="ui center aligned container"
            style={{ margin: "20px" }}
          >
            <div className="ui header">
              <h3>{`As of ${this.state.transactionDate}`}</h3>
            </div>
          </div>
        </div>
        <div>
          <div className="ui container">
            <div className="ui grid">
              <div className="eight wide column">
                <div className="ui fluid card left">
                  <div className="content">
                    <CurrencyRate
                      base={this.state.base}
                      currencyRate={this.state.currencyRate}
                      toCurrency={this.state.toCurrency}
                    />
                  </div>
                  <div className="content">
                    <SearchCurrency
                      updateBase={this.updateBase}
                      base={this.state.base}
                      currencies={this.state.currencies}
                      toCurrency={this.state.toCurrency}
                      containerSection={this.state.containerSection}
                    />
                  </div>
                  <div className="content">
                    <Calculator
                      currencyRate={this.state.currencyRate}
                      onInputChange={this.onInputChange}
                      base={this.state.base}
                      toCurrency={this.state.toCurrency}
                      amount={this.state.amount}
                      containerSection={this.state.containerSection}
                    />
                  </div>
                  <div className="content">
                    <QuickConversion
                      updateBase={this.updateBase}
                      containerSection={this.state.containerSection}
                    />
                  </div>
                </div>
              </div>
              <div className="eight wide column">
                <div className="ui fluid card right">
                  <div className="content">
                    <CurrencyRate
                      base={this.state.toCurrency}
                      currencyRate={this.state.currencyRateInverted}
                      toCurrency={this.state.base}
                    />
                  </div>
                  <div className="content">
                    <SearchCurrency
                      updateBase={this.updateBase}
                      updateToCurrency={this.updateToCurrency}
                      base={this.state.base}
                      currencies={this.state.currencies}
                      toCurrency={this.state.toCurrency}
                      containerSection={!this.state.containerSection}
                    />
                  </div>
                  <div className="content">
                    <Calculator
                      currencyRate={this.state.currencyRate}
                      base={this.state.toCurrency}
                      toCurrency={this.state.toCurrency}
                      amount={this.state.amount}
                      containerSection={!this.state.containerSection}
                    />
                  </div>
                  <div className="content">
                    <QuickConversion
                      updateToCurrency={this.updateToCurrency}
                      containerSection={!this.state.containerSection}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <BuyButton
            base={this.state.base}
            userBalance={this.state.userBalance}
            amount={this.state.amount}
            updateCurrencyBalances={this.updateCurrencyBalances}
          />
        </div>
        <div>
          <CurrencyAccount userBalance={this.state.userBalance} />
        </div>
      </div>
    );
  }
}

export default App;
