var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/myFavorite"
var session =  require('express-session');
var FileStore = require('session-file-store')(session);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/userRouter');
var makananRouter = require('./routes/makananRouter');
var restorantRouter = require('./routes/restorantRouter');
var wilayahRouter = require('./routes/wilayahRouter');

const connect = mongoose.connect(url);
connect.then(db => {
  console.log("Koneksi Berhasil");
}, (err) => {
  console.log(err);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'session-id',
  secret: 'secret-key',
  saveUninitialized: true,
  resave: true,
  store: new FileStore(),
  cookie: {secure: false}
}));

function auth (req, res, next) {
  console.log(req.headers);
  if (!req.session.user) {
    let err = new Error("You're not authenticated!");
    err.status = 401;
    next(err);
  } 
  else {
    if (req.session.user && req.session.username) {
      //find di DB
      console.log('req. session: '+req.session);
      next();
    } else {
      let err = new Error("You're not authenticated!");
      err.status = 401;
      next(err);
    }
  }
}


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/makanan', makananRouter);
app.use('/restorant', restorantRouter);
app.use('/wilayah', wilayahRouter);

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
