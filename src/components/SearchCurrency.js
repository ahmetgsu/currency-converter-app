import React from "react";
import uuid from "uuid";
// import country from "../country.json";

class SearchCurrency extends React.Component {
  handleChange = e => {
    console.log(e.target);
    if (e.target.name === "from") {
      // this.setState({ base: e.target.value });
      this.props.updateBase(e.target.value);
    }
    if (e.target.name === "to") {
      // this.setState({ toCurrency: e.target.value });
      this.props.updateBase(e.target.value);
    }
  };

  render() {
    const { base, currencies } = this.props;
    return (
      <div>
        <div className="frmdropdown">
          <select
            id="frmmenu"
            className="ui fluid selection dropdown"
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
      </div>
    );
  }
}

export default SearchCurrency;
