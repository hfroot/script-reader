from bs4 import BeautifulSoup
from bs4.element import Tag
from pathlib import Path
import json

def text_of_tags(soup, tag = None, tags = None):
  if tag and not tags:
    tags = soup.find_all(tag)
  elif not tags and not tag:
    return
  texts = []
  for t in tags:
    texts.append(t.get_text())
  return texts

def add_marker(output, element):
  output['text'].append({
    'marker': True,
    'text': element.get_text()
  })

def main():
  textsPath = Path(__file__).parent / "../assets/texts/"
  filename = textsPath / "phedre/Phèdre (Racine), Didot, 1854 - Wikisource.html"
  with open(filename, encoding='utf8') as f:
    html_doc = f.read()

  soup = BeautifulSoup(html_doc, 'html.parser')
  acts = text_of_tags(soup, 'h3')
  scenes = text_of_tags(soup, 'h4')
  character = soup.find(class_="personnage").get_text()
  opening_line = soup.find(class_="poem verse").get_text()

  output = {
    "title": "Phedre",
    "author": "Jean Baptiste Racine",
    "language": "fr",
    "characters": {
      "N": {
        "name": " Nawal",
        "nickname": "N"
      },
      "J": {
        "name": " Jeanne",
        "nickname": "J"
      },
      "S": {
        "name": " Simon",
        "nickname": "S"
      },
      "H": {
        "name": " Hermile Lebel",
        "nickname": "H"
      }
    },
    'text': []
  }
  originalTextHtml = soup.find(class_="prp-pages-output").descendants
  current_character = ""
  for element in originalTextHtml:
    if element.name == "h3":
      if not len(output['text']):
        output['text'].append({
          'marker': True,
          'text': element.get_text()
        })
      else:
        break
    elif element.name == "h4":
      add_marker(output, element)
    elif isinstance(element, Tag) and 'class' in element.attrs:
      if 'personnage' in element['class']:
        current_character = element.get_text().strip('.')
      elif 'poem' in element['class']:
        output['text'].append({
          "character": current_character,
          "text": element.get_text()
        })
  with open(textsPath / 'phedre/fr.json', 'w', encoding='utf8') as outfile:
    json.dump(output, outfile, indent=2, ensure_ascii=False)

main()