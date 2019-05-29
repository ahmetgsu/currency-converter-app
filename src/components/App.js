import React from "react";
import SearchCurrency from "./SearchCurrency";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";

class App extends React.Component {
  render() {
    return (
      <div className="cconverter">
        <div id="fromsection" className="ccsection">
          <span id="frmrate" className="ccrate">
            Currency Rate will be here
          </span>
          <SearchCurrency />
        </div>
      </div>
    );
  }
}

export default App;
