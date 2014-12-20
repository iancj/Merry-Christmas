module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            app: {
                files: {
                    'dist/js/app.js': [
                        'src/js/zepto-min.js',
                        'src/js/snowstorm.js',
                        'src/js/christmas.js'
                    ]
                }
            }
        },
        cssmin: {
            app: {
                files: {
                    'dist/css/app.css': [
                        'src/css/christmas.css',
                        'src/css/animate.css'
                    ]
                }
            }
        },
        imagemin: {
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/images/', // Src matches are relative to this path
                    src: ['**/*.{jpg,png,gif}','!resources/*.*'], // Actual patterns to match
                    dest: 'dist/images/', // Destination path prefix
                    filter: "isFile"
                }]
            }
        },
        clean: {
            "beforeBuild": ['dist'] //构建之前先删除旧版文件
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('build', ['clean:beforeBuild', 'uglify','cssmin','imagemin']);
};
