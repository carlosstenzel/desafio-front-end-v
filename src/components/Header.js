import React from "react";

import logo from "../logo.svg";

function Header() {
  return (
    <header>
      <nav>
        <img src={logo} alt="Desafio" />
        <span>Frontend React Test</span>
      </nav>
    </header>
  );
}

export default Header;
