import React from "react";
import uuid from "uuid";

class SearchCurrency extends React.Component {
  componentDidMount() {
    console.log(`SearchCurrency component is mounted`);
  }

  handleChange = e => {
    if (this.props.containerSection) {
      this.props.updateBase(e.target.value);
    } else {
      this.props.updateToCurrency(e.target.value);
    }
  };

  renderContent = () => {
    const { base, currencies, toCurrency, containerSection } = this.props;

    if (containerSection) {
      return (
        <div>
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
      );
    } else {
      return (
        <div>
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
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SearchCurrency;
