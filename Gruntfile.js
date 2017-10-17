module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    uglify: {
      dist: {
        options: {
          mangle: true,
          compress: true,
        },
        files: {
          'build/static/app.js': ['js/**/*.js']
        }
      }
    },
    less: {
      dist: {
        files: {
          'build/static/app.css': ['css/**/*.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyURLs: true,
          minifyJS: true
        },
        files: [
          {
            expand: true,
            src: ['views/**/*.hbs'],
            dest: 'build'
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: ['fonts/**/*', 'img/**/*'],
            dest: 'build/static'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: true,
        nospawn: true
      },
      js: {
        files: ['js/**/*.js'],
        tasks: 'uglify'
      },
      less: {
        files: ['less/**/*.less'],
        tasks: 'less'
      },
      html: {
        files: ['views/**/*.hbs'],
        tasks: 'htmlmin'
      },
      files: {
        files: ['fonts/**/*', 'img/**/*'],
        tasks: 'copy'
      },
      babel: {
        files: 'src/**/*.js',
        tasks: ['babel', 'express'],
      },
    },
    clean: ['build'],
    babel: {
      build: {
        files: {
          'build/app.js': 'src/index.js',
        },
      },
    },
    express: {
      build: {
        options: {
          script: 'build/app.js',
        },
      },
    },
  });

  grunt.registerTask('default', ['clean', 'uglify', 'less', 'htmlmin', 'copy', 'babel']);
  grunt.registerTask('dev', ['default', 'express', 'watch']);

};

