import React from "react";
import './Header.css';
import ToggleDarkMode from './ToggleDarkMode'

function Header() {
  return <header>
    <a href="#root">
      Top
    </a>
    <ToggleDarkMode />
  </header>;
}

export default Header;