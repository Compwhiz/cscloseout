module.exports = function () {
    var client = './client/';
    var server = './server/';
    var build = './build/';
    var serverViews = server + 'views/';
    var clientApp = client;// + 'app/';
    var wiredep = require('wiredep');
    var root = './';
    var report = root + 'report/';
    var temp = './.tmp/';
    var bower = {
        json: require('./bower.json'),
        directory: root + 'bower_components',
        ignorePath: '../..'
    };
    var wd = wiredep({
        devDependencies: true
    });

    var config = {
        allcss: client + 'css/**/*.css',
        alljs: [
            './**/*.js',
        // './*.js',
            '!./node_modules/**/*.js',
            '!./bower_components/**/*.js',
            '!./public/js/lib/*.js',
            '!./report/**/*.js',
            '!./test/**/*.js'
        ],
        allClientJs: client + '**/*.js',
        allClientTs: client + 'ts/**/*.ts',
        bower: bower,
        bowerWiredep: wd,
        bowerCSS: wd['css'],
        build: build,
        buildCss: build + 'css/',
        buildJs: build + 'js',
        buildFontsDir: build + 'fonts',
        browserReloadDelay: 1000,
        css: client + 'css/',
        client: client,
        clientJs: client + 'js/',
        defaultPort: '8080',
        favicon: client + 'favicon.ico',
        fonts: bower.directory + '/font-awesome/fonts/**/*.*',
        fontsDir: client + 'fonts',
        htmltemplates: [client + '**/*.html', '!' + client + 'index.html'],
        index: client + 'index.html',
        images: client + 'images/**/*.*',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js',
            '!' + clientApp + 'bower_components/**/*.js'
        ],
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        nodeServer: './server/app.js',
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        packages: [
            './packages.json',
            './bower.json'
        ],
        plato: {
            js: clientApp + '**/*.js'
        },
        root: root,
        report: report,
        server: server,
        serverViews: serverViews,
        source: './',
        scss: client + 'sass/site.scss',
        stubsjs: [
            bower.directory + 'angular-mocks/angular-mocks.js',
            client + 'stubs/**/*.js'
        ],
        temp: temp,
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: 'app/',
                standAlone: false
            }
        }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};