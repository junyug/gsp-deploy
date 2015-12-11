'use strict'

module.exports = function (grunt) {

  grunt.initConfig({

    babel: {
      all: {
        expand: true,
        src: 'src/**/*.js',
        rename: function (dest, src) {
          return src.replace('src/', 'lib/');
        }
      }
    },

    copy: {
        all: {
            expand: true,
            src: 'src/scaffolds/*',
            rename: function (dest, src) {
                return src.replace('src/', 'lib/');
            }
        }
    },

    eslint: {
      options: {
        config: 'eslint.json'
      },
      all: {
        src: 'src/**/*.js'
      }
    },

    watch: {
      source: {
        files: 'src/**/*',
        tasks: ['eslint', 'babel', 'copy'],
        options: {
          spawn: false
        },
      },
    }

  });

  grunt.event.on('watch', function (action, filepath) {
    grunt.config('eslint.all.src', filepath);
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['copy', 'babel']);
  grunt.registerTask('default', ['eslint', 'copy', 'babel']);
};
