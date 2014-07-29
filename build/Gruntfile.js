var os = require('os');
var path = require('path');
var packageJSON = require('./package.json');

module.exports = function(grunt) {
  var atomShellDownloadDir = path.join(os.tmpdir(), 'atom-cached-atom-shells')

  console.log(process.cwd());

  grunt.initConfig({
    'download-atom-shell': {
      version: packageJSON.atomShellVersion,
      outputDir: 'atom-shell',
      downloadDir: atomShellDownloadDir,
      rebuild: true
    }
  });

  grunt.loadNpmTasks('grunt-download-atom-shell');
};
