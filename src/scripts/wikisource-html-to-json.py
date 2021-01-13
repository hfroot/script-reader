from bs4 import BeautifulSoup
from pathlib import Path

def text_of_tags(soup, tag = None, tags = None):
  if tag and not tags:
    tags = soup.find_all(tag)
  elif not tags and not tag:
    return
  texts = []
  for t in tags:
    texts.append(t.get_text())
  return texts

def main():
  filename = Path(__file__).parent / "../assets/texts/phedre/Phèdre (Racine), Didot, 1854 - Wikisource.html"
  with open(filename) as f:
    html_doc = f.read()

  soup = BeautifulSoup(html_doc, 'html.parser')
  acts = text_of_tags(soup, 'h3')
  scenes = text_of_tags(soup, 'h4')
  character = soup.find(class_="personnage").get_text()
  opening_line = soup.find(class_="poem verse").get_text()
  print(opening_line)

main()