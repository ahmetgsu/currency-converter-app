import React from "react";
import uuid from "uuid";
// import country from "../country.json";

class SearchCurrency extends React.Component {
  componentDidMount() {
    console.log(`SearchCurrency component is mounted`);
  }

  handleChange = e => {
    // console.log(e.target.value);
    this.props.updateBase(e.target.value);
    // this.props.updateBaseOnClick(currency);
  };

  renderContent = () => {
    const { base, currencies, toCurrency, containerSection } = this.props;
    // console.log();

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

  // render() {
  //   console.log(this.props);
  //   const { base, currencies, toCurrency } = this.props;
  //   return (
  //     <div>
  //       <div>
  //         <select
  //           className="ui fluid selection dropdown"
  //           name="from"
  //           value={base}
  //           onChange={e => this.handleChange(e)}
  //         >
  //           {currencies.map(item => (
  //             <option key={uuid()} value={item}>
  //               {item}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //     </div>
  //   );
  // }
}

export default SearchCurrency;
