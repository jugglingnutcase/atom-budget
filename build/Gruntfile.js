var os = require('os');
var path = require('path');

module.exports = function(grunt) {
  var atomShellDownloadDir = path.join(os.tmpdir(), 'atom-cached-atom-shells')

  grunt.initConfig({
    'download-atom-shell': {
      version: '0.13.2',
      outputDir: 'atom-shell',
      downloadDir: atomShellDownloadDir,
      rebuild: true
    }
  });

  grunt.loadNpmTasks('grunt-download-atom-shell');
};
