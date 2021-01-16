import React from "react";
import './ToggleDarkMode.css';

function ToggleDarkMode() {
  function switchTheme(e) {
    if (!e.target.classList.contains("active")) {
      document.documentElement.setAttribute('data-theme', 'dark');
      e.target.classList.add("active");
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      e.target.classList.remove("active");
    }
  }
  return <div id="dark-mode-toggle">
    <button id="dark-mode-button" onClick={switchTheme}/>
  </div>;
}

export default ToggleDarkMode;