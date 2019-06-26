import React from "react";

class BuyButton extends React.Component {
  render() {
    return (
      <div className="ui right aligned container" style={{ margin: "20px" }}>
        <div className="ui header">
          <button
            className="ui positive basic button"
            style={{ fontSize: "2em" }}
          >
            Buy
          </button>
        </div>
      </div>
    );
  }
}

export default BuyButton;
