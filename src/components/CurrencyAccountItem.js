import React from "react";
import uuid from "uuid";

class CurrencyAccountItem extends React.Component {
  render() {
    console.log(this.props);
    const { userBalance } = this.props;
    console.log(userBalance);
    return (
      <div className="content">
        <div className="ui cards">
          {userBalance.map(item => (
            <div key={uuid()} className="card">
              <div className="content">{item.currency}</div>
              <div className="content">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CurrencyAccountItem;
