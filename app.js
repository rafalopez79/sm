
var appName ="smgreen";
var bunyan = require('bunyan');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var i18n = require("i18n");


var routes = require('./routes/index');
var app = express();
var logger = bunyan.createLogger({
    name: appName, 
    serializers: bunyan.stdSerializers,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        }
    ]
});

// view engine setup
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(cookieParser({
    secret: appName
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
    secret: appName,
    name: appName,
    cookie: { secure: true },
    resave: false,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress()); 

i18n.configure({
  locales: ['en', 'es', 'pt'],
  cookie: 'i18nlocale',
  directory: __dirname + '/locales'
});
app.use(i18n.init);

//log requests
app.use('/', function (req, res, next) {
    req.logger = logger;
    logger.info({ req: req},'request');
    next();
});

app.use('/', function (req, res, next) {
    req.logger = logger;
    logger.info({ req: req},'request');
    next();
});

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});

module.exports = app;
logger.info({message: "Application startup"});