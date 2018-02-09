import util from 'util';
import fs from 'fs';
import path from 'path';

import capitalize from './titlelize.js';
import cc from './collection-code';
import * as testdata from './testdata';
import takeItems from './take-items';

import { eachSeries, eachOf } from 'async';
// import eachSeries from 'async/eachSeries';
// import eachOf from 'async/eachOf';
const readFile = util.promisify(fs.readFile);
const checkExists = util.promisify(fs.exists);

let metaObj = {
  title: 'doctorine',
  description: 'A documentation management library of tools'
}
console.log(`${capitalize(metaObj.title)}: ${metaObj.description}`);

let obj = {dev: "development.json", test: "testing.json", prod: "production.json"};
let configs = {};
let eachOfDevFlag = false
eachOfDevFlag && eachOf(obj, function (value, key, callback) {
  fs.readFile(path.resolve(__dirname,'../fixtures/test1-confs',value), "utf8", function (err, data) {
      if (err) return callback(err);
      try {
          configs[key] = JSON.parse(data);
      } catch (e) {
          return callback(e);
      }
      callback();
  });
},
function (err) {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
    console.log(configs);
});


let srcFile = 'preface.md'
let readFileDevFlag = false
readFileDevFlag && readFile(path.resolve(__dirname,'../fixtures',srcFile), "utf8")
  .then(function(content) {
    console.log(content);
    // console.log(content.toString());
  })
  .catch(function(err) {
    // 
    console.error(err);
  });

/*
 args:
 coll:Array | Iterable | Object :A collection to iterate over.

 */
let srcDir = 'test2-manuscript'
let srcFiles = ['chapter1.md','chapter2.md','chapter3.md']
eachSeries(srcFiles, function(file, callback) {
    // Perform operation on file here.
    // console.log('Processing file ' + file);
    readFile(path.resolve(__dirname,'../fixtures',srcDir,file), "utf8")
      .then(function(content) {
        // console.log('File processed' + file);
        // stack content into internal variable here
        // console.log(content);
        callback();
      })
      .catch(function(err) {
        console.error(err);
        callback('error proccing file' + file);
      });

}, function(err) {
    // if any of the file processing produced an error, err would equal that error
    if( err ) {
      // One of the iterations produced an error.
      // All processing will now stop.
      console.log('A file failed to process');
    } else {
      console.log('All files have been processed successfully');
    }
});
