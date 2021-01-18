import React from "react";
import './TextNavigation.css';
import ToggleDarkMode from './ToggleDarkMode'

function TextNavigation(props) {
  const text = props.text;
  const markers = text.text.filter((entry) => entry.marker);

  function showSubLevels(key) {
    return (event) => {
      const target = event.target || event.srcElement;
      const revealingClassName = "sub-reveal";
      const previousSubLevels = target.parentElement.getElementsByClassName(revealingClassName);
      for(const element of previousSubLevels) {
        element.classList.remove(revealingClassName);
      }
      const subLevelClassName = "sub-" + target.href.split('#')[1];
      for(const element of target.parentElement.getElementsByClassName(subLevelClassName)) {
        element.classList.add(revealingClassName);
      }
    }
  };

  let currentLevel1;
  return <div id="TextNavigation">
    <a href="#root">
      Top
    </a>
    {
      markers.map((marker) => {
        currentLevel1 = (marker.marker === 1) ? marker.id : currentLevel1;
        const additionalAction = (marker.marker === 1) ? showSubLevels(marker.id) : null;
        let className = "marker-anchor-"+marker.marker;
        className += (marker.marker === 2) ? " sub-"+currentLevel1 : "";
        return (
          <a href={"#"+marker.id} key={marker.id} className={className} onClick={additionalAction}>
            {marker.text[props.lang]}
          </a>
        );
      })
    }
  </div>;
}

export default TextNavigation;