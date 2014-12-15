var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var Writer = require('broccoli-writer');
var Promise = require('rsvp').Promise

JsonManifest.prototype = Object.create(Writer.prototype);
JsonManifest.prototype.constructor = JsonManifest;

function JsonManifest(inputTree, options) {
  if (!(this instanceof JsonManifest)) return new JsonManifest(inputTree, options);

  this.inputTree = inputTree;
  this.options = options;
}

JsonManifest.prototype.write = function (readTree, destDir) {
  var _this = this;

  return readTree(this.inputTree).then(function (srcDir) {
    var baseDir = srcDir;
    var files = readDirectory(srcDir);
    var time = new Date().toISOString().replace(/\D/g, '');
    var obj = {"timestamp": time, "files": files};

    function readDirectory (srcDir) {
      var files = [];
      var entries = fs.readdirSync(srcDir);
      var relativePath = path.relative(baseDir, srcDir)
      Array.prototype.forEach.call(entries, function(entry) {
        if (fs.lstatSync(path.join(srcDir, entry)).isDirectory()) {
          files = files.concat(readDirectory(path.join(srcDir, entry)));
        } else {
          //obj[entry.split('.')[0]] = JSON.parse(fs.readFileSync(path.join(srcDir, entry)));
          files.push(path.join(relativePath, entry));
        }
      });

      return files;
    };

    output = JSON.stringify(obj, 2, " ");

    mkdirp.sync(path.join(destDir, path.dirname(_this.options.outputFile)));
    fs.writeFileSync(path.join(destDir, _this.options.outputFile), output);
  });
}

module.exports = JsonManifest;
