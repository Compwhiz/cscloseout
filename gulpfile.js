(function () {
    'use strict';

    var
        bowerFiles = require('main-bower-files'),
        nodemon = require('gulp-nodemon'),
        gulp = require('gulp'),
        inject = require('gulp-inject'),
        merge = require('merge-stream'),
        sass = require('gulp-sass');

    var config = require('./gulp.config')();
    var wiredep = require('wiredep').stream;
    var wiredepOptions = config.getWiredepDefaultOptions();
    
    /**===========================================================
    @Task - nodemon -- Run node application and watch with nodemon
    ============================================================*/
    gulp.task('nodemon', function () {
        return nodemon({
            script: 'index.js',
            env: {
                'NODE_ENV': 'production'
            }
        })
            .on('restart');
    });
  
    /**============================================================================
    @Task - nodemon:debug -- Run node application with debug and watch with nodemon
    =============================================================================*/
    gulp.task('nodemon:debug', function () {
        return nodemon({
            script: 'index.js',
            env: {
                'NODE_ENV': 'development'
            },
            nodeArgs: ['--debug']
        })
            .on('restart');
    });

    /**=============================================================
    @Task - fonts -- Copy font-awesome fonts to dev and build folder
    ==============================================================*/
    gulp.task('fonts', function () {
        var devStream = gulp.src(config.fonts)
            .pipe(gulp.dest(config.fontsDir));

        var buildStream = gulp.src(config.fonts)
            .pipe(gulp.dest(config.build));

        return merge(devStream, buildStream);
    });

    /**================================================================================
    @Task - compile:scss -- Compile Sass style files and output in client/dev folder
    =================================================================================*/
    gulp.task('compile:scss', function () {
        return gulp.src([config.scss, config.bower.directory + '/font-awesome/scss/font-awesome.scss'])
            .pipe(sass().on('on', sass.logError))
            .pipe(gulp.dest(config.css));
    });

    /**===========================================================================
    @Task - inject:css -- Inject project CSS references into client/dev index.html
    ============================================================================*/
    gulp.task('inject:css', ['compile:scss'], function () {
        var sources = gulp.src(config.allcss, { read: false });

        return gulp.src(config.index)
        // .pipe(wiredep(wiredepOptions))
            .pipe(inject(sources))
            .pipe(gulp.dest(config.client));
    });

    /**=========================================================================
    @Task - inject:js -- Inject project JS references into client/dev index.html
    ==========================================================================*/
    gulp.task('inject:js', function () {
        var js = config.js;
        var sources = gulp.src(js, { read: false });

        return gulp.src(config.index)
            // .pipe(wiredep(wiredepOptions))
            .pipe(inject(sources))
            .pipe(gulp.dest(config.client))
    });
    
    /**================================================================================================
    @Task - inject:bower -- Inject third party (bower) JS and CSS references into client/dev index.html
    =================================================================================================*/
    gulp.task('inject:bower', function () {
        var sources = gulp.src(bowerFiles(), { read: false });

        return gulp.src(config.index)
            .pipe(inject(sources, { name: 'bower' }))
            .pipe(gulp.dest(config.client))
    });

    /**======================================
    @Task - inject -- Run all inject tasks
    =======================================*/
    gulp.task('inject', ['inject:js', 'inject:bower', 'inject:css']);
    
    /**========================================
    @Task - build -- Run client/dev build tasks
    =========================================*/
    gulp.task('build', ['compile:scss', 'inject'], function () { });

    /**=========================================================================
    @Task - default -- Run build task, start production node server, watch files
    ==========================================================================*/
    gulp.task('default', ['build', 'nodemon']);
} ());
