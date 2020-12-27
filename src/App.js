import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import FrenchText from './assets/texts/incendies/fr.json'
import EnglishText from './assets/texts/incendies/en.json'

const languageMap = {
  "fr": {
    "display": "français",
    "text": FrenchText
  },
  "en": {
    "display": "english",
    "text": EnglishText
  }
};

function App() {
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

  const characters = languageMap[state.lang].text.characters;
  const altCharacters = languageMap[state.altLang].text.characters;
  const selectedCharacter = "alice"; // demo

  return (
    <div className="App">
      <div className="TextHeader">
        <h1>{languageMap[state.lang].text.title}</h1>
        <h2>{languageMap[state.lang].text.author}</h2>
      </div>
      <div className="Configuration">
        <button onClick={toggleLanguage}>Change language to: {languageMap[state.altLang].display}</button>
      </div>
      <div className="TextBody" style={{"white-space": "pre-wrap"}}>
        {languageMap[state.lang].text.text.map((t, key) => {
          let altT = languageMap[state.altLang].text.text[key];
          if (t.marker) {
            return (
              <h3 key={key} onMouseDown={showAltLine(key)} onMouseUp={resetLine(key)}>
                <span className={state.lang}>{t.text}</span>
                <span className={state.altLang} style={{display:"none"}}>{altT.text}</span>
              </h3>
            );
          } else if (t.direction) {
            return (
              <p key={key} onMouseDown={showAltLine(key)} onMouseUp={resetLine(key)}>
                <span className={state.lang}><i>{t.text}</i></span>
                <span className={state.altLang} style={{display:"none"}}><i>{altT.text}</i></span>
              </p>
            );
          } else {
            const highlighted = t.character === selectedCharacter;
            return (
              <p key={key} onMouseDown={showAltLine(key)} onMouseUp={resetLine(key)} className={highlighted ? "highlighted" : ""}>
                <span className={state.lang}><b>{characters[t.character].name}: </b>{t.text}</span>
                <span className={state.altLang} style={{display:"none"}}><b>{altCharacters[altT.character].name}: </b>{altT.text}</span>
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
