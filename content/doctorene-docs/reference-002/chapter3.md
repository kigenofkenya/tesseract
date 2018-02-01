Shit on my Titties!
============================

I finally have some working stuff. Even if it's not wrapped too tight. It's the 14th of December 2016, i've been at this a long time and that's resulted in a sprawling mess of progress and regression without a tail to grab on to or a pair of horns ot take charge. It may be too soon to whisper success but I may be rounding a corner. So let's have a look.

At this time I have 0 online links as in i'm accessing exactly 0 APIs, have 0 websites and 0 blogs. It would seem to be dissapointng but in the past i've approached all that from a most unready positon and yeilded little success. Instead I've come to focus on existing files and sharpening concepts that i've already had a go around with. This documentation system for example is 5 years old. I've pushed changes up and down and found that with great power comes great... inertia.

With that in mind let's have a look at the featurs, limits, concepts and anatomy of not only this but the entire stargate system.

Immediate Steps (delete me on completion)
--------

Let's get things going on stargate commnad (sgc) which currently has no address but can help get things going.
 * Do a build of any app on ios, lets see if that works. (global priority tree)
   * Get the frontpage system working on success
 * Get a gate address map up. (global priority)
  * Use VueFB grid for entries on a temporary basis (SGC)
  * Use the Frames system to display simple pages with reactive doms (ss) in view boxes.

Priorities
--------

* knox.local has
* Automatic indent and outdent
* An optional command line
* Handles huge documents (100,000 lines and more are no problem)
* Fully customizable key bindings including VI and Emacs modes
* Themes (TextMate themes can be imported)
* Search and replace with regular expressions
* Highlight matching parentheses
* Toggle between soft tabs and real tabs
* Displays hidden characters
* Drag and drop text using the mouse
* Line wrapping
* Unstructured / user code folding
* Live syntax checker (currently JavaScript/CoffeeScript)

Doctoreen Quickstsart!
--------------------

Check out the Ace live [demo](http://ajaxorg.github.com/ace/) or get a [Cloud9 IDE account](http://run.cloud9ide.com) to experience Ace while editing one of your own GitHub projects.

If you want, you can use Ace as a textarea replacement thanks to the [Ace Bookmarklet](http://ajaxorg.github.com/ace/build/textarea/editor.html).

History
-------

Previously known as “Bespin” and “Skywriter” it’s now known as Ace (Ajax.org Cloud9 Editor)! Bespin and Ace started as two independent projects, both aiming to build a no-compromise code editor component for the web. Bespin started as part of Mozilla Labs and was based on the canvas tag, while Ace is the Editor component of the Cloud9 IDE and is using the DOM for rendering. After the release of Ace at JSConf.eu 2010 in Berlin the Skywriter team decided to merge Ace with a simplified version of Skywriter's plugin system and some of Skywriter's extensibility points. All these changes have been merged back to Ace. Both Ajax.org and Mozilla are actively developing and maintaining Ace.

Getting the code
----------------

Ace is a community project. We actively encourage and support contributions. The Ace source code is hosted on GitHub. It is released under the BSD License. This license is very simple, and is friendly to all kinds of projects, whether open source or not. Take charge of your editor and add your favorite language highlighting and keybindings!

```bash
    git clone git://github.com/ajaxorg/ace.git
    cd ace
    git submodule update --init --recursive
```

Embedding Ace
-------------

Ace can be easily embedded into any existing web page. The Ace git repository ships with a pre-packaged version of Ace inside of the `build` directory. The same packaged files are also available as a separate [download](https://github.com/ajaxorg/ace/downloads). Simply copy the contents of the `src` subdirectory somewhere into your project and take a look at the included demos of how to use Ace.

The easiest version is simply:

```html
    <div id="editor">some text</div>
    <script src="src/ace.js" type="text/javascript" charset="utf-8"></script>
    <script>
    window.onload = function() {
        var editor = ace.edit("editor");
    };
    </script>
```

With "editor" being the id of the DOM element, which should be converted to an editor. Note that this element must be explicitly sized and positioned `absolute` or `relative` for Ace to work. e.g.

```css
    #editor {
        position: absolute;
        width: 500px;
        height: 400px;
    }
```

To change the theme simply include the Theme's JavaScript file

```html
    <script src="src/theme-twilight.js" type="text/javascript" charset="utf-8"></script>
```

and configure the editor to use the theme:

```javascript
    editor.setTheme("ace/theme/twilight");
```

By default the editor only supports plain text mode; many other languages are available as separate modules. After including the mode's JavaScript file:

```html
    <script src="src/mode-javascript.js" type="text/javascript" charset="utf-8"></script>
```

Then the mode can be used like this:

```javascript
    var JavaScriptMode = require("ace/mode/javascript").Mode;
    editor.getSession().setMode(new JavaScriptMode());
```

Documentation
-------------

You find a lot more sample code in the [demo app](https://github.com/ajaxorg/ace/blob/master/demo/demo.js).

There is also some documentation on the [wiki page](https://github.com/ajaxorg/ace/wiki).

If you still need help, feel free to drop a mail on the [ace mailing list](http://groups.google.com/group/ace-discuss).

Running Ace
-----------

After the checkout Ace works out of the box. No build step is required. Open 'editor.html' in any browser except Google Chrome. Google Chrome doesn't allow XMLHTTPRequests from files loaded from disc (i.e. with a file:/// URL). To open Ace in Chrome simply start the bundled mini HTTP server:

```bash
    ./static.py
```

Or using Node.JS

```bash
    ./static.js
```

The editor can then be opened at http://localhost:8888/index.html.

Package Ace
-----------

To package Ace we use the dryice build tool developed by the Mozilla Skywriter team. Before you can build you need to make sure that the submodules are up to date.

```bash
    git submodule update --init --recursive
```

Afterwards Ace can be built by calling

```bash
    ./Makefile.dryice.js normal
```

The packaged Ace will be put in the 'build' folder.

To build the bookmarklet version execute

```bash
    ./Makefile.dryice.js bm
```

Running the Unit Tests
----------------------

The Ace unit tests run on node.js. Before the first run a couple of node modules have to be installed. The easiest way to do this is by using the node package manager (npm). In the Ace base directory simply call

```bash
    npm link .
```

To run the tests call:

```bash
    node lib/ace/test/all.js
```

You can also run the tests in your browser by serving:

    http://localhost:8888/lib/ace/test/tests.html

This makes debugging failing tests way more easier.

Contributing
------------

Ace wouldn't be what it is without contributions! Feel free to fork and improve/enhance Ace any way you want. If you feel that the editor or the Ace community will benefit from your changes, please open a pull request. To protect the interests of the Ace contributors and users we require contributors to sign a Contributors License Agreement (CLA) before we pull the changes into the main repository. Our CLA is the simplest of agreements, requiring that the contributions you make to an ajax.org project are only those you're allowed to make. This helps us significantly reduce future legal risk for everyone involved. It is easy, helps everyone, takes ten minutes, and only needs to be completed once.  There are two versions of the agreement:

1. [The Individual CLA](https://github.com/ajaxorg/ace/raw/master/doc/Contributor_License_Agreement-v2.pdf): use this version if you're working on an ajax.org in your spare time, or can clearly claim ownership of copyright in what you'll be submitting.
2. [The Corporate CLA](https://github.com/ajaxorg/ace/raw/master/doc/Corporate_Contributor_License_Agreement-v2.pdf): have your corporate lawyer review and submit this if your company is going to be contributing to ajax.org  projects

If you want to contribute to an ajax.org project please print the CLA and fill it out and sign it. Then either send it by snail mail or fax to us or send it back scanned (or as a photo) by email.

Email: fabian.jakobs@web.de

Fax: +31 (0) 206388953

Address: Ajax.org B.V.
  Keizersgracht 241
  1016 EA, Amsterdam
  the Netherlands