import React from "react";
import SearchCurrency from "./SearchCurrency";
import CurrencyRate from "./CurrencyRate";
import QuickConversion from "./QuickConversion";
import axios from "axios";
// import Country from "./Country";

// import "./style.css";

class App extends React.Component {
  state = {
    base: "USD",
    amount: "",
    toCurrency: "EUR",
    currencies: [],
    className: ""
  };

  componentDidMount() {
    this.getBaseCurrencyData();
  }
  updateBase = currency => {
    this.setState({ base: currency }, () => {
      this.getBaseCurrencyData();
    });
  };

  getBaseCurrencyData = () => {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => {
        console.log(res.data.rates[this.state.toCurrency]);
        const currencyRate = res.data.rates[this.state.toCurrency].toFixed(5);
        const transactionDate = res.data.date;
        this.setState({ currencyRate, transactionDate });

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
                    />
                  </div>
                  <div className="content">Calculator will be shown here</div>
                  <div className="aligned content">
                    <QuickConversion
                      updateBase={this.updateBase}
                      base={this.state.base}
                      currencies={this.state.currencies}
                      toCurrency={this.state.toCurrency}
                    />
                  </div>
                </div>
              </div>
              <div className="eight wide column">
                <div className="ui fluid card right">
                  <div className="content">
                    Currency Rate-to will be shown here
                  </div>
                  <div className="content">
                    CurrencySearch-to dropdown will be shown here
                  </div>
                  <div className="content">Calculator will be shown here</div>
                  <div className="content">
                    Quick currency selector buttons will be shown here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
