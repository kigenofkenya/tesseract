require("babel-register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  // Optional ignore regex - if any filenames **do** match this regex then they
  // aren't compiled.
  // ignore: false

  // Optional only regex - if any filenames **don't** match this regex then they
  // aren't compiled
  // only: /my_es6_folder/,
  // Setting this will remove the currently hooked extensions of .es6, `.es`, `.jsx`
  // and .js so you'll have to add them back if you want them to be used again.
  // extensions: [".es6", ".es", ".jsx", ".js"],

  // Setting this to false will disable the cache.
  // cache: true
presets: ["env"]
// You can pass in all other options as well, 
// including plugins and presets.
// But note that the closest .babelrc to each file still applies,
//  and takes precedence over any options you pass in here.
});

require("./bab-reg-src/index.js");

// mainApp()