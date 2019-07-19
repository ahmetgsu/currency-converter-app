import React from "react";
import uuid from "uuid";
import ReactCountryFlag from "react-country-flag";

class SearchCurrency extends React.Component {
  handleChange = e => {
    this.props.containerSection
      ? this.props.updateBase(e.target.value)
      : this.props.updateToCurrency(e.target.value);
  };

  renderContent = () => {
    const {
      base,
      baseCode,
      currencies,
      toCurrency,
      toCurrencyCode,
      containerSection
    } = this.props;

    if (containerSection) {
      console.log(this.props);
      if (!currencies.includes(base)) {
        currencies.push(base);
      }
      return (
        <div className="ui grid">
          <div className="four wide column">
            <ReactCountryFlag
              code={baseCode}
              svg
              styleProps={{
                width: "85.125px",
                height: "37.972px"
              }}
            />
          </div>
          <div className="twelve wide column">
            <select
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
    } else {
      return (
        <div className="ui grid">
          <div className="four wide column">
            <ReactCountryFlag
              code={toCurrencyCode}
              svg
              styleProps={{
                width: "85.125px",
                height: "37.972px"
              }}
            />
          </div>
          <div className="twelve wide column">
            <select
              className="ui fluid selection dropdown"
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
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SearchCurrency;
