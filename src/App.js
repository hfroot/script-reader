import React, {useState} from 'react';
import './App.css';
import {LanguageMap, Text} from './Text.js';

function App() {
  const text = Text();
  const [state, setState] = useState({
    lang: "fr",
    altLang: "en"
  });
  let toggleLanguage = function() {
    setState({
      lang: state.altLang,
      altLang: state.lang
    });
  };
  // TODO: check if this way of managing elements is accessible
  let showAltLine = function(key) {
    return (event) => {
      // not convinced by the parent fallback
      const target = event.target || event.srcElement;
      const currentElement = target.localName === "span" ? target : (target.getElementsByClassName(state.lang)[0] || target.parentElement);
      const pElement = currentElement.parentElement;
      const altElement = pElement.getElementsByClassName(state.altLang)[0];
      currentElement.style.display = "none";
      altElement.style.display = "";
    };
  };
  let resetLine = function(key) {
    return (event) => {
      const target = event.target || event.srcElement;
      const altElement = target.localName === "span" ? target : (target.getElementsByClassName(state.altLang)[0] || target.parentElement);
      const parent = altElement.parentElement;
      const currentElement = parent.getElementsByClassName(state.lang)[0];
      currentElement.style.display = "";
      altElement.style.display = "none";
    };
  };

  const characters = text.characters[state.lang];
  const altCharacters = text.characters[state.altLang];
  const selectedCharacter = "S"; // demo
  let lastCharacter;

  function getCharacterName(charId, useAlt) {
    let hasMoreInfo = !!characters[charId];
    if(hasMoreInfo) {
      return useAlt ? altCharacters[charId].name : characters[charId].name;
    } else {
      return charId;
    }
  }

  return (
    <div id="App">
      <div id="TextHeader">
        <h1>{text.title[state.lang]}</h1>
        <h2>{text.author[state.lang]}</h2>
      </div>
      <div id="Configuration">
        <button onClick={toggleLanguage}>Change language to: {LanguageMap[state.altLang].display}</button>
      </div>
      <div id="TextBody" style={{whiteSpace: "pre-wrap"}}>
        {text.text.map((t, key) => {
          const displayText = t.text[state.lang];
          const altDisplayText = t.text[state.altLang];
          if (t.marker) {
            lastCharacter = null;
            return (
              <h3 key={key} onMouseDown={showAltLine(key)} onMouseUp={resetLine(key)}>
                <span className={state.lang}>{displayText}</span>
                <span className={state.altLang} style={{display:"none"}}>{altDisplayText}</span>
              </h3>
            );
          } else if (t.direction) {
            return (
              <p key={key} onMouseDown={showAltLine(key)} onMouseUp={resetLine(key)}>
                <span className={state.lang}><i>{displayText}</i></span>
                <span className={state.altLang} style={{display:"none"}}><i>{altDisplayText}</i></span>
              </p>
            );
          } else {
            const sameCharacter = lastCharacter === t.character;
            lastCharacter = t.character;
            const highlighted = t.character === selectedCharacter;
            return (
              <p key={key} onMouseDown={showAltLine(key)} onMouseUp={resetLine(key)} className={highlighted ? "highlighted" : ""}>
                <span className={state.lang}><b className={sameCharacter ? "same-character" : null}>{getCharacterName(t.character)}: </b>{displayText}</span>
                <span className={state.altLang} style={{display:"none"}}><b className={sameCharacter ? "same-character" : null}>{getCharacterName(t.character, true)}: </b>{altDisplayText}</span>
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
