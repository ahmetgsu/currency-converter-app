import React from "react";
import axios from "axios";
import uuid from "uuid";
// import country from "../country.json";

class SearchCurrency extends React.Component {
  state = {
    base: "USD",
    date: "",
    amount: "",
    toCurrency: "EUR",
    currencies: []
  };

  componentDidMount() {
    // console.log(country);
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => {
        const currencyArr = [];
        for (const item in res.data.rates) {
          currencyArr.push(item);
        }
        this.setState({ currencies: currencyArr.sort() });
      })
      .catch(err => {
        console.log("Opps", err.message);
      });
  }

  handleChange = e => {
    if (e.target.name === "from") {
      this.setState({ base: e.target.value });
    }
    if (e.target.name === "to") {
      this.setState({ toCurrency: e.target.value });
    }
    console.log(e.target);
  };

  render() {
    const { base, date, toCurrency, currencies } = this.state;
    return (
      <div>
        <div className="frmdropdown">
          <select
            id="frmmenu"
            className="ui dropdown"
            name="from"
            value={base}
            onChange={e => this.handleChange(e)}
          >
            {currencies.map(item => (
              <option key={uuid()} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="todropdown">
          <select
            id="tomenu"
            className="ui dropdown"
            name="to"
            value={toCurrency}
            onChange={e => this.handleChange(e)}
          >
            {currencies.map(item => (
              <option key={uuid()} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default SearchCurrency;
