var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); 
var cors =require('cors');
var passport =require('passport');
var mongoose= require('mongoose');

//file paths
var config=require('./config/database');
var index = require('./routes/index');
var users = require('./routes/users');

// Connect to database 
mongoose.connect(config.database);
mongoose.Promise = global.Promise;

//On Connection
mongoose.connection.on('connected',() => {

	console.log('connected to database =>' +config.database);
});

//On Error
mongoose.connection.on('error',(err) => {

	console.log('database error' +err);
});



 
var app = express();


 //Cors Middleware
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
//app.use('/', index);



//index Router
app.get('/',function(req,res){
	res.send('index');
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
