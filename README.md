# Dual language script reader

A web app to facilitate language learning through reading scripts with various feature such as:

* toggling the language/alternative language
* peeking at a line in the alternative language

## Getting started

```
npm install
cd src/scripts
python html-to-json.py
cd ../../
npm run start
```

To deploy, make sure you have surge installed globally:

```
npm install --global surge
npm run deploy
```

## Project structure

Translations for texts are saved in separate files, with the file name as `<ISO 639-1 language code>.md`, in a folder for the play.

I.e.
\>src
\>\>assets
\>\>\>texts
\>\>\>\>[play title]
\>\>\>\>\>en.md
\>\>\>\>\>fr.md
\>\>\>\>\>[ISO language code].md

The format of the play files is:

```
---
title: The Tempest
author: William Shakespeare
language: en
characters:
  - name: Prosporo
    nickname: Pr
    description: Prosporo is a flighty fellow.
  - name: Beatrice
    nickname: Bea
    description: Beatrice never runs away from a fight.
---
# Act 1
## Scene 1
_Pr enters, pursued by a bear._
__Pr__ To be _(__Pr__ stands)_, or not to be,
    **that** is the question.
__Bea__ It should actually be:
To be, or not to be,
    that is the **question**.
```

The example above demonstrates the core syntax.

The script's metadata is contained within the section beginning and ending with three hyphens. Characters can be given nicknames to use in the script to save time typing. When rendered, the nicknames will be expanded.

The script itself uses header styles to format the play structure. Stage directions, both standalone and in the middle of a line of speech, are surrounded by underscores. Character names to denote who is speaking or in stage directions are surrounded by double underscores. Italic and bold formatting of spoken text should use the asterix formatting. Whitespace is preserved. New lines without new character denotions are attributed to the same character as the previous line.

It is assumed that translations of the same text will have the same structure, for example that character speech, stage directions, and paragraphs will line up evenly. This is admittedly limited for more complex translations, but should work for my use cases.
