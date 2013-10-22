'use strict';

module.exports = function(grunt)
{
  grunt.loadNpmTasks('grunt-contrib-less');

  // load all grunt tasks
  grunt.initConfig({
    less: {
      development: {
        options: {
          strictImports: true
        },
        files: {
          "css/style.css": "less/style.less"
        }
      }
    }
  });
}