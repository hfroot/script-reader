import FrenchText from './assets/texts/incendies/fr.json'
import EnglishText from './assets/texts/incendies/en.json'

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
      FrenchText[key].forEach((line, idx) => {
        let translatedLine = {
          'character': line.character,
          'direction': line.direction,
          'marker': line.marker,
          'text': {
            'fr': line.text,
            'en': EnglishText.text[idx].text
          }
        };
        combinedText[key].push(translatedLine);
      });
    }
  }
  return combinedText;
}

export {LanguageMap, Text};