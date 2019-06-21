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

  updateBaseOnClick = currency => {
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
        const currencyRateInverted = (1 / currencyRate).toFixed(5);
        const transactionDate = res.data.date;
        this.setState({ currencyRate, transactionDate, currencyRateInverted });

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
                      updateBaseOnClick={this.updateBaseOnClick}
                    />
                  </div>
                  <div className="content">
                    <div className="ui grid">
                      <div className="sixteen wide center aligned column">
                        <div className="ui input focus">
                          <input
                            type="text"
                            placeholder="Amount to be converted"
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
                        Commission rate
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
                    <CurrencyRate
                      base={this.state.toCurrency}
                      currencyRate={this.state.currencyRateInverted}
                      toCurrency={this.state.base}
                    />
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
