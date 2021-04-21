var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//cors解决跨域资源共享问题
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter=require('./routes/admin')
const config = require('./config/config').config;

//实例化express应用 构建服务器
var app = express();

//连接数据库
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.ipfs_api}:27017/`, { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//这会允许在网络上的任何位置访问所有路由  解决跨域问题
app.use(cors());
app.use(logger('dev'));

/*
What is Middleware?
It is those methods/functions/operations that are called BETWEEN processing the Request
and sending the Response in your application method.

When talking about express.json() and express.urlencoded() think specifically
about POST requests (i.e. the .post request object) and PUT Requests (i.e. the .put request object)

You DO NOT NEED express.json() and express.urlencoded() for GET Requests or DELETE Requests.

You NEED express.json() and express.urlencoded() for POST and PUT requests,
because in both these requests you are
sending data (in the form of some data object) to the server
and you are asking the server to accept or store that data (object),
which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

a. express.json() is a method inbuilt in express to recognize the incoming Request Object
as a JSON Object. This method is called as a middleware in your application
using the code: app.use(express.json());

b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object
as strings or arrays. This method is called as a middleware in your application
using the code: app.use(express.urlencoded());

ALTERNATIVELY,  recommend using body-parser (it is an NPM package) to do the same thing.
It is developed by the same peeps who built express and is designed to work with express.
body-parser used to be part of express.
Think of body-parser specifically for POST Requests (i.e. the .post request object)
and/or PUT Requests (i.e. the .put request object).
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//静态资源 （图像、CSS 文件和 JavaScript 文件之类的静态文件 ）可以直接通过localhost:3000//images//{filename}访问
app.use(express.static(path.join(__dirname, 'public')));

//拦截路径
app.use('/', indexRouter);  //Mount the router as middleware at root path

//具体的一些业务逻辑都在userRouter里面
app.use('/users', usersRouter);

app.use('/admin', adminRouter)

// 链式 以上都没有捕获到  创建404交给next(): error handler
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

//挂载
module.exports = app;
