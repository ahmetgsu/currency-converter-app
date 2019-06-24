import React from "react";
import uuid from "uuid";
// import country from "../country.json";

class SearchCurrency extends React.Component {
  constructor(props) {
    super(props);

    this.divRef = React.createRef();
  }

  componentDidMount() {
    console.log(`SearchCurrency component is mounted`);
    const className = this.divRef.current.offsetParent.className;
    console.log(className);
  }

  handleChange = e => {
    console.log(e.target);
    this.props.updateBase(e.target.value);
    this.props.updateBaseOnClick(e.target);
    // if (e.target.name === "from") {
    // this.setState({ base: e.target.value });
    // }
    // if (e.target.name === "to") {
    // this.setState({ toCurrency: e.target.value });
    // this.props.updateBase(e.target.value);
    // }
  };

  // renderContent = () => {
  //   const { className } = this.divRef.current.offsetParent;
  //   const { base, currencies, toCurrency } = this.props;
  //   console.log(className);

  // if (className === "ui fluid card left") {
  //   return (
  //     <div>
  //       <div ref={this.divRef}>
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

  // if (className === "ui fluid card right") {
  //   return (
  //     <div>
  //       <div ref={this.divRef}>
  //         <select
  //           className="ui fluid selection dropdown"
  //           name="to"
  //           value={toCurrency}
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
  // };

  // render() {
  //   return <div>{this.renderContent()}</div>;
  // }

  render() {
    // console.log();
    const { base, currencies, toCurrency } = this.props;
    return (
      <div>
        <div ref={this.divRef}>
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
  }
}

export default SearchCurrency;
