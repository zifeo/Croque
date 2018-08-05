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
          'build/static/app.js': ['js/jquery-3.2.1.min.js', 'js/**/*.js'],
        },
      },
    },
    less: {
      dist: {
        files: {
          'build/static/app.css': ['css/**/*.css'],
        }
      }
    },
    purifycss: {
      options: {},
      target: {
        src: ['build/static/app.js', 'build/views/**/*.hbs'],
        css: ['build/static/app.css'],
        dest: 'build/static/app.css',
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyURLs: true,
          minifyJS: true,
          ignoreCustomFragments: [/{{[\s\S]*?}}/],
        },
        files: [
          {
            expand: true,
            src: ['views/**/*.hbs'],
            dest: 'build',
          },
        ],
      },
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: ['fonts/**/*', 'img/**/*'],
            dest: 'build/static',
          },
        ],
      },
    },
    watch: {
      options: {
        livereload: true,
        nospawn: true,
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['uglify', 'purifycss'],
      },
      less: {
        files: ['css/**/*.css'],
        tasks: ['less', 'purifycss'],
      },
      html: {
        files: ['views/**/*.hbs'],
        tasks: ['htmlmin', 'purifycss'],
      },
      files: {
        files: ['fonts/**/*', 'img/**/*'],
        tasks: 'copy',
      },
      babel: {
        files: 'src/**/*.js',
        tasks: ['babel', 'express'],
      },
    },
    clean: ['build'],
    babel: {
      options: {
        sourceMap: true,
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'build',
          ext: '.js'
        }],
      },
    },
    express: {
      build: {
        options: {
          script: 'build/app.js',
        },
      },
    },
    env: {
      build: {
        src: '.env',
      },
    },
  });

  grunt.registerTask('default', ['clean', 'uglify', 'less', 'htmlmin', 'purifycss', 'copy', 'babel']);
  grunt.registerTask('dev', ['default', 'env', 'express', 'watch']);

};

