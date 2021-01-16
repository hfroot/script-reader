import React from "react";
import './ToggleDarkMode.css';

function ToggleDarkMode() {
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
  return <div className="theme-switch-wrapper">
    <label className="theme-switch" htmlFor="checkbox" onChange={switchTheme}>
      <input type="checkbox" id="checkbox" />
      <div className="slider round"></div>
    </label>
    <em>Enable Dark Mode!</em>
  </div>;
}

export default ToggleDarkMode;