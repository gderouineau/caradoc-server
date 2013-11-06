
var express = require('express');
var http    = require('http');
var path    = require('path');
var MemoryStore = express.session.MemoryStore;
var params = require('../../../config/params/project');


exports.start =  function () {

    var app = express();

    var rootPath = path.resolve( __dirname, "../../../");

    var server = http.createServer(app);

    app.set('port', process.env.PORT || params.data.port);
    app.set('views', rootPath );
    app.set('view engine', params.data.view);
    app.set('title', params.data.name);
    app.use(express.favicon(),'/public/images/favicon.ico');
    app.use(express.logger(params.data.env));
    app.use(express.json());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(params.data.secret));//params.data.secret
    app.use(express.session({secret : params.data.secret , store : new MemoryStore()}));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '/public')));

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    var router = require('caradoc-router');
    router.get(app);

    server.listen(app.get('port'), function(){
        console.log('Caradoc server listening on port ' + app.get('port'));
    });


};