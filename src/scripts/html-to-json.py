from bs4 import BeautifulSoup
from bs4.element import Tag
from pathlib import Path
import json
import re

TEXTS_PATH = Path(__file__).parent / "../assets/texts/"

def get_soup(filename):
  full_path = TEXTS_PATH / filename
  with open(full_path, encoding='utf8') as f:
    html_doc = f.read()
  return BeautifulSoup(html_doc, 'html.parser')

# all arguments are strings. Language is 2 letter ISO code.
def new_output(title, author, language):
  return {
    "title": title,
    "author": author,
    "language": language,
    "characters": {},
    'text': []
  }

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
    'text': element.get_text().strip()
  })

def write_to_file(filename, output):
  with open(TEXTS_PATH / filename, 'w', encoding='utf8') as outfile:
    json.dump(output, outfile, indent=2, ensure_ascii=False)

# TODO: ignore bits of text that isn't displayed
# Better: figure out how to save the indentation (again, a formatting thing of verse plays)
def wiki_parse():
  soup = get_soup("phedre/Phèdre (Racine), Didot, 1854 - Wikisource.html")
  output = new_output("Phèdre", "Jean Baptiste Racine", "fr")
  originalTextHtml = soup.find(class_="prp-pages-output").descendants

  current_character_id = ""
  for element in originalTextHtml:
    if element.name == "h3":
      add_marker(output, element)
    elif element.name == "h4":
      add_marker(output, element)
    elif isinstance(element, Tag) and 'class' in element.attrs:
      if 'personnage' in element['class']:
        character_name = element.get_text().strip('.')
        current_character_id = character_name.lower()
        if current_character_id not in output['characters']:
          output['characters'][current_character_id] = {
            "name": character_name
          }
      elif 'poem' in element['class']:
        # this is necessary because page breaks cause new "poem verse" divs (see span class="pagenum ws-pagenum")
        # TODO: would be better to strip multiple \ns too
        if len(output['text']) and 'character' in output['text'][-1] and current_character_id == output['text'][-1]['character']:
          output['text'][-1]['text'] += element.get_text()
        else:
          output['text'].append({
            "character": current_character_id,
            "text": element.get_text()
          })

  write_to_file('phedre/fr.json', output)

def character_mapping(en_id):
  return {
    "hippolytus": "hippolyte",
    "theramenes": "théramène",
    "oenone": "œnone",
    "phaedra": "phèdre",
    "panope": "panope",
    "aricia": "aricie",
    "ismene": "ismène",
    "i": "i",
    "theseus": "thésée",
    "work": "work"
  }[en_id]

def format_speech_body(string):
  minimised_spaces = re.sub(r' +', ' ', string.strip())
  no_leading_space = re.sub(r'\n ', '\n', minimised_spaces)
  return '\n' + no_leading_space

def gutenberg_parse():
  soup = get_soup("phedre/Phaedra, by Jean Baptiste Racine.htm")
  output = new_output("Phaedra", "Jean Baptiste Racine", "en")

  starting_tag = soup.find("h2", string=re.compile("ACT I")).previous_sibling
  for element in starting_tag.next_siblings:
    if element.name == "h2":
      add_marker(output, element)
    elif element.name == "pre":
      scene_match = re.search(r"((?:SCENE|Scene) [IVX]+)", str(element.string))
      if scene_match:
        output['text'].append({
          'marker': True,
          'text': scene_match.group(0)
        })
      else:
        # this RE assumes all character names are single word, in capitals, and followed by a new line
        character_name_match = re.search(r"([A-Z]{2,})\n", str(element.string))
        if character_name_match:
          # if there is a character name, assume there is character speech in the same string
          # this assumes all lines of speech start with a single capital letter (after the line with the name)
          # or that the line starts with something like "'Twas"
          # NB: this required editing the license info in the original text to be in a footer tag to be skipped
          for speech_match in re.finditer(r"(([A-Z]{2,})((?:\n\s*'?[a-zA-Z][^A-Z].+)+))", str(element.string)):
            character_name = speech_match.group(2).strip()
            character_id = character_mapping(character_name.lower())
            output['text'].append({
              'character': character_id,
              # prefixed with newline to follow formatting practices for verse plays
              'text': format_speech_body(speech_match.group(3))
            })
            if character_id not in output['characters']:
              output['characters'][character_id] = {
                'name': character_name
              }

  write_to_file('phedre/en.json', output)

wiki_parse()
gutenberg_parse()