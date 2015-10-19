// Generated on 2014-07-22 using generator-webapp 0.4.7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    '!<%= yeoman.app %>/scripts/{,*/}*.min.js'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            compass: {
                files: [
                    '<%= yeoman.app %>/styles/{,*/}*.{scss,sass}',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,gif}'
                ],
                tasks: ['compass:server'/*, 'autoprefixer'*/]
            },
            styles: {
                files: [
                    '<%= yeoman.app %>/styles/{,*/}*.css',
                    '!<%= yeoman.app %>/styles/{,*/}*.min.css'
                ],
                //tasks: ['newer:copy:styles', 'autoprefixer']
            },
            html: {
                files: [
                    '<%= yeoman.app %>/html/{,*/}*.html'
                ],
                tasks: ['htmlmin']
            },
            css: {
                files: [
                    '<%= yeoman.app %>/styles/{,*/}*.css',
                    '!<%= yeoman.app %>/styles/{,*/}*.min.css'
                ],
                tasks: ['cssmin']
            },
            script: {
                files: [
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    '!<%= yeoman.app %>/scripts/{,*/}*.min.js'
                ],
                tasks: ['uglify']
            },
            images: {
                files: [
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,gif}'
                ],
                tasks: ['imagemin']
            },
            svg: {
                files: [
                    '<%= yeoman.app %>/images/{,*/}*.{svg}'
                ],
                tasks: ['svgmin']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'taraud-m.dev.fr'
            },
            livereload: {
                options: {
                    open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>',
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },


        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },




        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '<%= yeoman.app %>/styles',
                generatedImagesDir: '<%= yeoman.app %>/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/img/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: [
                        '{,*/}*.{gif,jpeg,jpg,png}',
                        '{,*/}*/{,*/}*.{gif,jpeg,jpg,png}',
                    ],
                    dest: '<%= yeoman.app %>/img'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.app %>/img'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/html',
                    src: '{,*/}*.html',
                    dest: '<%= yeoman.app %>'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= yeoman.app %>/styles',
                    ext: '.min.css'
                }]
            }
        },
        /*uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: ['*.js', '!*.min.js'],
                    dest: '<%= yeoman.app %>/scripts',
                    ext: '.min.js'
                }]
            }
        },*/
        uglify: {
            app: {
                files: {
                    '<%= yeoman.app %>/js/main.min.js': [
                        '<%= yeoman.app %>/scripts/modernizr.min.js',
                        '<%= yeoman.app %>/scripts/jquery.min.js',
                        '<%= yeoman.app %>/scripts/main.js',
                        '<%= yeoman.app %>/scripts/sweet-alert.js',
                        '<%= yeoman.app %>/scripts/ee.js'
                    ],
                    '<%= yeoman.app %>/js/experiences.min.js': [
                        '<%= yeoman.app %>/scripts/modernizr.min.js',
                        '<%= yeoman.app %>/scripts/jquery.min.js',
                        '<%= yeoman.app %>/scripts/main.js',
                        '<%= yeoman.app %>/scripts/experiences.js',
                        '<%= yeoman.app %>/scripts/sweet-alert.js',
                        '<%= yeoman.app %>/scripts/ee.js'
                    ],
                    '<%= yeoman.app %>/js/competences.min.js': [
                        '<%= yeoman.app %>/scripts/modernizr.min.js',
                        '<%= yeoman.app %>/scripts/jquery.min.js',
                        '<%= yeoman.app %>/scripts/main.js',
                        '<%= yeoman.app %>/scripts/filters.js',
                        '<%= yeoman.app %>/scripts/sweet-alert.js',
                        '<%= yeoman.app %>/scripts/ee.js'
                    ],
                    '<%= yeoman.app %>/js/portfolio.min.js': [
                        '<%= yeoman.app %>/scripts/modernizr.min.js',
                        '<%= yeoman.app %>/scripts/jquery.min.js',
                        '<%= yeoman.app %>/scripts/main.js',
                        '<%= yeoman.app %>/scripts/filters.js',
                        '<%= yeoman.app %>/scripts/galerie.js',
                        '<%= yeoman.app %>/scripts/sweet-alert.js',
                        '<%= yeoman.app %>/scripts/ee.js'
                    ],
                    '<%= yeoman.app %>/js/contact.min.js': [
                        '<%= yeoman.app %>/scripts/modernizr.min.js',
                        '<%= yeoman.app %>/scripts/jquery.min.js',
                        '<%= yeoman.app %>/scripts/main.js',
                        '<%= yeoman.app %>/scripts/contact.js',
                        '<%= yeoman.app %>/scripts/sweet-alert.js',
                        '<%= yeoman.app %>/scripts/ee.js'
                    ],
                    '<%= yeoman.app %>/js/browsehappy.min.js': [
                        '<%= yeoman.app %>/scripts/browsehappy.js'
                    ]
                }
            }
        },
        concat: {
            dist: {}
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },



        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'compass:server',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            //'clean:server',
            //'concurrent:server',
            //'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer',
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
