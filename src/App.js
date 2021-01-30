import React, { useState } from 'react';
import './App.css';
import { LanguageMap, Text } from './Text.js';
import TextNavigation from './components/TextNavigation'

function App() {
  const text = Text();
  const [state, setState] = useState({
    lang: "fr",
    altLang: "en"
  });
  let toggleLanguage = function () {
    setState({
      lang: state.altLang,
      altLang: state.lang
    });
  };
  // TODO: check if this way of managing elements is accessible
  let toggleLineLanguage = function (key) {
    return (event) => {
      const target = event.target || event.srcElement;
      const targetElement = target.localName === "span" ? target : (target.getElementsByClassName(state.lang)[0] || target.parentElement);
      const container = targetElement.parentElement;
      const requestedElement = container.getElementsByClassName("altLang")[0];
      targetElement.classList.add("altLang");
      requestedElement.classList.remove("altLang");
    };
  };

  const characters = text.characters;
  const selectedCharacter = "hippolyte"; // demo
  let charactersToSelect = [];
  for (const id in characters) {
    charactersToSelect.push({
      id: id,
      name: characters[id].name[state.lang]
    });
  };
  let lastCharacter;

  function getCharacterName(charId, lang) {
    return characters[charId]?.name[lang] || charId;
  }

  return (
    <div id="App">
      <TextNavigation lang={state.lang} text={text}/>
      <div id="AppBody">
        <div id="TextHeader">
          <h1>{text.title[state.lang]}</h1>
          <h2>{text.author[state.lang]}</h2>
        </div>
        <div id="Configuration">
          <button onClick={toggleLanguage}>Change language to: {LanguageMap[state.altLang].display}</button>
          <select>
            <option value="">-- Plz select character --</option>
            {charactersToSelect.map((character) => {
              return (
                <option value={character.id}>{character.name}</option>
              );
            })}
          </select>
        </div>
        <div id="TextBody" style={{ whiteSpace: "pre-wrap" }}>
          {text.text.map((t, key) => {
            const displayText = t.text[state.lang];
            const altDisplayText = t.text[state.altLang];
            // TODO: make these items keyboard accessible, maybe by wrapping them in buttons or links
            if (t.marker) {
              lastCharacter = null;
              return (
                <h3 className="marker" id={t.id} key={key} onClick={toggleLineLanguage(key)}>
                  <span className={state.lang}>{displayText}</span>
                  <span className={`${state.altLang} altLang`}>{altDisplayText}</span>
                </h3>
              );
            } else if (t.direction) {
              return (
                <p className="direction" key={key} onClick={toggleLineLanguage(key)}>
                  <span className={state.lang}><i>{displayText}</i></span>
                  <span className={`${state.altLang} altLang`}><i>{altDisplayText}</i></span>
                </p>
              );
            } else {
              const sameCharacter = lastCharacter === t.character;
              lastCharacter = t.character;
              const highlighted = t.character === selectedCharacter;
              return (
                <p key={key} className={`speech ${t.character} ${highlighted ? "highlighted" : ""}`} onClick={toggleLineLanguage(key)}>
                  <span className={state.lang}><b className={sameCharacter ? "same-character" : null}>{getCharacterName(t.character, state.lang)}: </b>{displayText}</span>
                  <span className={`${state.altLang} altLang`}><b className={sameCharacter ? "same-character" : null}>{getCharacterName(t.character, state.altLang)}: </b>{altDisplayText}</span>
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
