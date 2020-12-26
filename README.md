# Dual language script reader

A web app to facilitate language learning through reading scripts with various feature such as:

* toggling the language/alternative language
* peeking at a line in the alternative language

## Project structure

Translations for texts are saved in separate files, with the file name as `<ISO 639-1 language code>.json`, in a folder for the play.

I.e.
\>src
\>\>assets
\>\>\>texts
\>\>\>\>[play title]
\>\>\>\>\>en.json
\>\>\>\>\>fr.json
\>\>\>\>\>[ISO language code].json

The format of the play files is:

```
{
    "title": "The Tempest",
    "author": "William Shakespeare",
    "text": [
        {
            "marker": true,
            "text": "Act 1"
        },
        {
            "direction": true,
            "text": "Prosporo enters, pursued by a bear."
        },
        {
            "character": "Prospero",
            "text": "To be, or not to be,\nthat is the question"
        }
    ]
}
```

It is assumed that translations of the same text will have the same structure, and therefore each entry in the 'text' array will correspond to each other.

The example below demonstrates the three types of 'lines' that might make up a script. The first, a 'marker', could be a line marking the beginning of an act or scene or other. The second, a 'direction', is a stage direction and will be rendered visually differently to the spoken lines. The final and most common, are the spoken lines that should have a character as well as text.
