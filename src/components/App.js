import React from "react";
import SearchCurrency from "./SearchCurrency";
import CurrencyRate from "./CurrencyRate";
import QuickConversion from "./QuickConversion";
import Calculator from "./Calculator";
import BuyButton from "./BuyButton";
import CurrencyAccount from "./CurrencyAccount";
import {
  calculateCurrencyAfterCommission,
  updateBalance
} from "../lib/currencyCalculations";

import axios from "axios";

class App extends React.Component {
  state = {
    base: "USD",
    baseCode: "us",
    amount: null,
    toCurrency: "EUR",
    toCurrencyCode: "eu",
    currencies: [],
    containerSection: "left",
    userBalance: [{ currency: "USD", value: 1000 }]
  };

  componentDidMount() {
    this.getBaseCurrencyData();
  }

  updateBase = currency => {
    this.setState(
      { base: currency, baseCode: currency.slice(0, 2).toLowerCase() },
      () => {
        this.getBaseCurrencyData();
      }
    );
  };

  updateToCurrency = currency => {
    this.setState(
      {
        toCurrency: currency,
        toCurrencyCode: currency.slice(0, 2).toLowerCase()
      },
      () => {
        this.getBaseCurrencyData();
      }
    );
  };

  onInputChange = value => {
    console.log(value);
    this.setState({ amount: value });
  };

  //This function is called in BuyButton component by onClick event
  updateCurrencyBalances = () => {
    const { base, amount, toCurrency, userBalance, currencyRate } = this.state;

    const amountAfterCommissionToCurrency = calculateCurrencyAfterCommission(
      amount,
      currencyRate
    );

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
        console.log(res.data.rates);
        const currencyRate = res.data.rates[this.state.toCurrency].toFixed(5);
        const currencyRateInverted = (1 / currencyRate).toFixed(5);
        const transactionDate = res.data.date;

        const currencyArr = [];
        for (const item in res.data.rates) {
          currencyArr.push(item);
        }

        this.setState({
          currencyRate,
          transactionDate,
          currencyRateInverted,
          currencies: currencyArr.sort()
        });
      })
      .catch(err => {
        console.log("Opps", err.message);
      });
  };

  render() {
    //console.log(countryData.Response[0]);
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
                  <div
                    className="content"
                    style={{ backgroundColor: "#f1f8ff" }}
                  >
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
                      baseCode={this.state.baseCode}
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
                  <div
                    className="content"
                    style={{ backgroundColor: "#f1f8ff" }}
                  >
                    <CurrencyRate
                      base={this.state.toCurrency}
                      currencyRate={this.state.currencyRateInverted}
                      toCurrency={this.state.base}
                    />
                  </div>
                  <div className="content">
                    <SearchCurrency
                      updateToCurrency={this.updateToCurrency}
                      base={this.state.base}
                      currencies={this.state.currencies}
                      toCurrency={this.state.toCurrency}
                      toCurrencyCode={this.state.toCurrencyCode}
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
