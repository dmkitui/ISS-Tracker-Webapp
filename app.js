const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(session({
	secret:'sdfsdfdsfdsfds3243223dsfsdf2332423erwe',
	resave: true,
	saveUninitialized: false
}));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

mongoose.connect('mongodb://localhost:27017/iss-tracker', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db error'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/', homeRouter);
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

app.listen(3000);
console.log('ISS Tracker Webapp server running at: http://localhost:3000');

module.exports.db = db;
