const createError = require('http-errors');
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const expressValidator = require('express-validator');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
