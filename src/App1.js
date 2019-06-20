import React from "react";
import SearchCurrency from "./SearchCurrency";

// import "./style.css";

class App extends React.Component {
  render() {
    return (
      <div className="main-container">
        <div className="currconverter">
          <div className="currcy-header">
            <div className="ui grid container">
              <div id="frmsection" className="seven wide column">
                <span id="frmrate" className="ccrate">
                  Currency Rate will appear here
                </span>
                <div id="frmlist" className="cclist" />
                <div className="flagspace" />
                <SearchCurrency />
                <div id="frminput" className="ccinput" />
                <div id="frmcurrhint" title="Quick conversions from" />
              </div>
              <div id="equalsign" className="two wide column" />
              <div id="tosection" className="seven wide column">
                <span id="torate" className="ccrate">
                  Currency Rate will appear here
                </span>
                <div id="tolist" className="cclist" />
                <div className="flagspace" />
                <SearchCurrency />
                <div id="toinput" className="ccinput" />
                <div id="tocurrhint" title="Quick conversions to" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
