var express               = require('express');
var path                  = require('path');
var favicon               = require('static-favicon');
var logger                = require('morgan');
var cookieParser          = require('cookie-parser');
var bodyParser            = require('body-parser');
var mongoose              = require('mongoose');
var passport              = require('passport');
var expressSession        = require('express-session');
var flash                 = require('connect-flash');
var initPassport          = require('./passport/init');
var routes                = require('./routes/index')(passport);
var logger                = require("./utils/winston");
var helmet = require('helmet');


// Se configura ambiente
var env = process.env.NODE_ENV || 'development';

//Carga de configuracion
GLOBAL.config = config = require('./config/config')[env];

logger.debug('Inicializando el sistema... ++++ ');
var app = express();
app.use(helmet.noCache());

logger.debug('Configurando DB');
// Connect to DB
mongoose.connect(config.db);

logger.debug('Configurando app');
// view engine setup
app.set('views', path.join(config.root, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
//////////////app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(config.root, 'public')));
// Configuring Passport


var MongoStore = require('connect-mongo')(expressSession);

app.use(expressSession({
    secret: "@iPn@psscg3f1",
    saveUninitialized: true,
    resave: true,
    cookie: {
      expires: new Date(Date.now() + config.maxAge),
      maxAge: config.maxAge
    },
    rolling: true,
    store: new MongoStore({
      // Basic usage
      host: config.host_db, // Default, optional
      port: 27017, // Default, optional
      db: config.name_db, // Required
      // Basic authentication (optional)
      username: '',
      password: '',
      // Advanced options (optional)
      autoReconnect: true, // Default
      w: 1, // Default,
      ssl: false // Default
    })
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Initialize Passport
logger.debug('Configurando passport');
initPassport(passport);




logger.debug('Configurando rutas');
app.use('/', routes);



logger.debug('Configurando 404');
/// Cacha mensaje 404
app.use(function(req, res, next) {
    var err = new Error("Página no encontrada");
    err.status = 404;
    next(err);
});

logger.debug('Configurando stacktrace');
// Imprime stacktrace






if (app.get('env') === env) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


module.exports = app;
