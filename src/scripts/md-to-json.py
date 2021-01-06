import json

def parse_header(lines):
  output = {}
  values_dict_key = ''
  values_dict = {}
  values_dict_sub_key = ''
  values_dict_entry = False
  for line in lines:
    parts = line.split(':', 1)
    if values_dict_key != '':
      if parts[0].strip()[0] == '-':
        if values_dict_entry:
          if values_dict_sub_key == '':
            print("ERROR, no id for ", values_dict_entry)
          # check for duplicate ids?
          values_dict[values_dict_sub_key] = values_dict_entry.copy()
        values_dict_entry = {}
        values_dict_entry[parts[0].strip().split('-',1)[1].strip()] = parts[1]
      elif parts[0][0] == ' ':
        if parts[0].strip() == 'id':
          values_dict_sub_key = parts[1].strip()
        else:
          values_dict_entry[parts[0].strip()] = parts[1].strip()
      else:
        output[values_dict_key] = values_dict[:]
        values_dict_key = ''
        values_dict = []
    elif parts[1] != '':
      output[parts[0]] = parts[1].strip()
    else:
      values_dict_key = parts[0].strip()
  if values_dict_entry:
    if values_dict_sub_key == '':
      print("ERROR, no id for ", values_dict_entry)
    # check for duplicate ids?
    values_dict[values_dict_sub_key] = values_dict_entry.copy()
  if values_dict_key != '': # in case the header ends in an array
    output[values_dict_key] = values_dict
  return output

def main(lang):
  text = {}

  with open('../assets/texts/incendies/{0}.md'.format(lang)) as f:
      lines = f.readlines() # list containing lines of file

      if lines[0].strip() != "---":
        print("ERROR: ", lines[0], " is not ---")
        return
      else:
        header_lines = []
        l = 1
        while l < len(lines) and lines[l].strip() != "---":
          header_lines.append(lines[l].rstrip())
          l += 1
        text = parse_header(header_lines)
        play_text = []
        current_character = ''
        while l < len(lines):
          line = lines[l].strip() # may not be appropriate to remove initial whitespace
          l += 1
          parts = line.split(' ', 1)
          if line == '':
            continue
          elif line[0] == '#':
            play_text.append({
              'marker': True,
              'text': parts[1].strip()
            })
          elif line.startswith('__'):
            # character
            current_character = parts[0].strip('__')
            play_text.append({
              'character': current_character,
              'text': parts[1].strip()
            })
          elif line[0] == '_':
            play_text.append({
              'direction': True,
              'text': line.strip('_')
            })
          elif current_character != '':
            play_text.append({
              'character': current_character,
              'text': line
            })
        text['text'] = play_text
  
  with open('../assets/texts/incendies/{0}.json'.format(lang), 'w', encoding='utf8') as outfile:
    json.dump(text, outfile, indent=2, ensure_ascii=False)

for lang in ['fr', 'en']:
  main(lang)