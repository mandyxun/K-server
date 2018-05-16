
var express = require('express');
var path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://user:123456@ds239009.mlab.com:39009/kidstopia')
var cors = require('cors');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');

//server static files
app.use('/static', express.static(path.join(__dirname, '../Admin-client/build/static')));

// TODO: remove thsi after development is done.
app.use(cors());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-with");
  next();
});

app.use('/', indexRouter);
app.use('/admin', adminRouter);
//app.use('/users', usersRouter);

// app.use(function(req, res) {
//   res.sendFile('index.html', {root: path.join(__dirname, '../../Admin-client/build/')});
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send('404 Not Found');
});

module.exports = app;
