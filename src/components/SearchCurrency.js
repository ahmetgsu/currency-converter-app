import React from "react";
import axios from "axios";
import uuid from "uuid";
import country from "../country.json";
import "bootstrap/dist/css/bootstrap.min.css";

class SearchCurrency extends React.Component {
  state = {
    base: "USD",
    date: "",
    amount: "",
    toCurrency: "EUR",
    currencies: []
  };

  componentDidMount() {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => {
        const currencyArr = ["USD"];
        for (const item in res.data.rates) {
          currencyArr.push(item);
        }
        this.setState({ currencies: currencyArr.sort() });
      })
      .catch(err => {
        console.log("Opps", err.message);
      });
    
    fetch(`../country.json`)
      .then(res => res.json)
      .then(data => console.log(data))
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
        <div
          id="frmlist"
          className="cclist"
          style={{ width: "300px", margin: "10px auto" }}
        >
          <div className="flagspace">Flag will appear here</div>
          <div className="frmdropdown">
            <select
              name="from"
              style={{ width: "200px", margin: "0 auto" }}
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
        </div>
        <div
          id="toDropDown"
          className="cur-selection"
          style={{ width: "300px", margin: "10px auto" }}
        >
          <select
            name="to"
            style={{ width: "200px", margin: "0 auto" }}
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
