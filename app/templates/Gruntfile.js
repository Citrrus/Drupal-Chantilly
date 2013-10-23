'use strict';

module.exports = function(grunt)
{
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // load all grunt tasks
  grunt.initConfig({
    watch: {
      styles: {
        files: ['**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
    },
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