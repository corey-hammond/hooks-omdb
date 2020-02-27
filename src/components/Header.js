import React from "react";

export default Header = props => {
  return (
    <header className="App-header">
      <h2>{props.text}</h2>
    </header>
  );
};
