import FrenchText from './assets/texts/phedre/fr.json'
import EnglishText from './assets/texts/phedre/en.json'

const LanguageMap = {
  "fr": {
    "display": "français",
    "text": FrenchText
  },
  "en": {
    "display": "english",
    "text": EnglishText
  }
};

// will parse md files
// to produce a master JSON object
// which, for each line, is a dict of ISO language keys and their version of the line, translating at the last moment
function Text() {
  let combinedText = {};
  for (const key in FrenchText) {
    if (key !== 'text' && Object.hasOwnProperty.call(FrenchText, key)) {
      const element = FrenchText[key];
      combinedText[key] = {
        'fr': FrenchText[key],
        'en': EnglishText[key]
      }
    } else if(key === 'text') {
      combinedText[key] = [];
      let mismatchWarningRaised = false;
      FrenchText[key].forEach((line, idx) => {
        if(idx > EnglishText.text.length - 1) {
          // texts aren't aligned, indicating a fault in the translation. Debug using warnings in the console.
          return;
        }
        const englishLine = EnglishText.text[idx];
        if(!mismatchWarningRaised && (line.character !== englishLine.character || line.direction !== englishLine.direction || line.marker !== englishLine.marker)) {
          console.warn("Texts are out of sync from the following line pair: ", line, englishLine);
          mismatchWarningRaised = true;
        }
        let translatedLine = {
          'character': line.character,
          'direction': line.direction,
          'marker': line.marker,
          'text': {
            'fr': line.text,
            'en': englishLine.text
          }
        };
        combinedText[key].push(translatedLine);
      });
    }
  }
  return combinedText;
}

export {LanguageMap, Text};