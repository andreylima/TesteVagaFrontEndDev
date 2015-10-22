 
'use strict';
 
/**
 * Grunt Module
 */
module.exports = function(grunt) {
 
grunt.initConfig({
 
 sass: {
        dist: {
            files: {
                'assets/css/style.css': 'assets/sass/style.scss'
            }
        }
    },
postcss: {
    options: {
      // or
      map: {
          inline: false, 
          annotation: 'assets/dist/css/maps/'
      },

      processors: [
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({
              browers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            }), // add vendor prefixes
      ]
    },
    dist: {
     files: {
     	'assets/css/style.css' : 'assets/css/style.css'
     } 
    }
  },
concat: {
	options: {
	  separator: ';',
	},
	dist: {
	  src: ['assets/js/jquery-1.11.3.js', 'assets/js/jquery.countdown.js', 'assets/js/countDown.js'],
	  dest: 'assets/dist/script.js',
	},
},
uglify: {
    my_target: {
      files: {
        'assets/dist/script.min.js': ['assets/dist/script.js']
      }
    }
  },
cssmin: {
	    options: {
	      shorthandCompacting: false,
	      roundingPrecision: -1
	    },
	    target: {
	      files: {
	        'assets/css/style.min.css': ['assets/css/style.css']
	    }
    }
  },
watch: {
  sass: {
    files: 'assets/sass/*.{scss,sass}',
    tasks: ['sass:dist']
},
postcss: {
	files: 'assets/css/style.css',
	tasks: ['postcss:dist']
  },
uglify: {
	files: 'assets/dist/script.js',
	tasks: ['uglify:my_target']
  },
  cssmin: {
    files: 'assets/css/style.css',
    tasks: ['cssmin:target']
  }
	},


});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['sass','postcss:dist','concat:dist','uglify', 'cssmin', 'watch']);

};