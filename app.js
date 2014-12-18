var express               = require('express');
var path                  = require('path');
var favicon               = require('static-favicon');
var logger                = require('morgan');
var cookieParser          = require('cookie-parser');
var bodyParser            = require('body-parser');
var dbConfig              = require('./db');
var mongoose              = require('mongoose');
var passport              = require('passport');
var expressSession        = require('express-session');
var flash                 = require('connect-flash');
var initPassport          = require('./passport/init');
var routes                = require('./routes/index')(passport);
var logger                = require("./utils/winston");


logger.debug('Inicializando el sistema...');
var app = express();
logger.debug('Configurando DB');
// Connect to DB
mongoose.connect(dbConfig.url);

logger.debug('Configurando app')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
//////////////app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Configuring Passport
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Initialize Passport
logger.debug('Configurando passport')
initPassport(passport);

logger.debug('Configurando rutas')
app.use('/', routes);

logger.debug('Configurando 404')
/// Cacha mensaje 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

logger.debug('Configurando stacktrace')
// Imprime stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


module.exports = app;
