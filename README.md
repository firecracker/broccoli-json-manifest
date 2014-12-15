broccoli-json-manifest
======================

Creates a json file with a flat list of files and their relative paths

Installation
-----

`npm install --save broccoli-json-manifest`

Options
-------

- outputFile
-

Example
-------

**Input tree**

```
one
  |- uno.js
  |- dos.css
  |- two
    |- tres.js
    |- quatro.css
```

**Output file**

```
{
  "files": [
    "one/uno.js",
    "one/dos.css",
    "one/two/tres.js",
    "one/two/quatro.css"
  ]
}
```
**Output tree**

```
one
  |- uno.js
  |- dos.css
  |- two
    |- tres.js
    |- quatro.css
  |- manifest.json
```
