var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');

var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport'); // user mannagemenet
var flash = require('connect-flash');
var validator = require('express-validator');
var  Handlebars = require('handlebars')// Adding new dependecies to remove the error when retreving info from the server
var  {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')// Adding new dependecies to remove the error when retreving info from the server
var userRouter = require('./routes/user');

var indexRouter = require('./routes/index');

var app = express();
app.use(express.urlencoded({ extended: true }));



// connect to mongodb
mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true });
require('./config/passport') // Just load to auto run all the module and methods in config

// view engine setup
app.engine('.hbs', expressHbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars) // Estableciendo
}))


app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// resave says that I will not updatethe secciont in any change. saveUninitialized allow me to not save when nothing has been added.
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000} // the cookie seccion will expires after 3 h9
}));



app.use(flash());
app.use(validator());
app.use(passport.initialize());
app.use(passport.session()); // use session to stopre the users

app.use(express.static(path.join(__dirname, 'public')));

// global variable available in all my views
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next(); // After give that parameter to the view, now continue
})

app.use('/user', userRouter);

app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
