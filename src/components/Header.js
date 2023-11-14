import React from "react";
import "./Header.css";
import ToggleDarkMode from './ToggleDarkMode'

function Header() {
  return <header>
    <p>Thanks for the font, <a href="https://opendyslexic.org/">OpenDyslexic</a></p>
    <ToggleDarkMode />
  </header>;
}

export default Header;