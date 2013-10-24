'use strict';

module.exports = function(grunt)
{
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-coffee');
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
      <% if(themeUsesCoffee) { %>
      scripts: {
        files: ['**/*.coffee'],
        tasks: ['coffee'],
        options: {
          spawn: false,
        },
      },
      <%}%>
    },
    less: {
      development: {
        options: {
          strictImports: true
        },
        files: {
          "css/style.css": "less/*.less"
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'js/script.js' : 'coffee/*.coffee'
        }
      }
    }
  });
}