import React from "react";

class QuickConversion extends React.Component {
  handleClick = e => {
    this.props.updateBaseOnClick(e.target.value);
  };

  render() {
    return (
      <div className="ui stackable four column grid">
        <div className="column">
          <button className="ui button" onClick={e => this.handleClick(e)}>
            <strong>{"USD"}</strong>
          </button>
        </div>
        <div className="column" onClick={e => this.handleClick(e)}>
          <button className="ui button" onClick={e => this.handleClick(e)}>
            <strong>{"GBP"}</strong>
          </button>
        </div>
        <div className="column" onClick={e => this.handleClick(e)}>
          <button className="ui button" onClick={e => this.handleClick(e)}>
            <strong>{"EUR"}</strong>
          </button>
        </div>
        <div className="column" onClick={e => this.handleClick(e)}>
          <button className="ui button" onClick={e => this.handleClick(e)}>
            <strong>{"JPY"}</strong>
          </button>
        </div>
      </div>
    );
  }
}

export default QuickConversion;
