# Chapter 1

Working on organizing this collection.

## Currently

By default the editor only supports plain text mode; many other languages are available as separate modules. After including the mode's JavaScript file:

```html
    <script src="src/mode-javascript.js" type="text/javascript" charset="utf-8"></script>
```

Then the mode can be used like this:

```javascript
    var JavaScriptMode = require("ace/mode/javascript").Mode;
    editor.getSession().setMode(new JavaScriptMode());
```

```bash
    ./static.py
```

*   run apps in development
*   build for platforms
*   jsbeautify,minify,attatch components

## To-do

*   Internal Link to section/subsection within this dynamic doc.
*   External Link to other dynmaic document, handled in a variety of ways.
*   Image, embedded in page and linked to a larger size/gallery of related images.
*   Link to PDF document with options to read in online reader/download/add to user-storage.

### Internal Links

This link directs to [Section One - Subection A](#articleOne-subsectionA).

###External Links

This links to an external site inline [Markdown article on wikipedia](http://en.wikipedia.com/wiki/Markdown).
This links to an external site from a link pool at the bottom.
----



