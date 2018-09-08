// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();
var mongoose = require('mongoose')
var loginSessions=require('./server/models/model_login')
const mongourl='mongodb://steem:steem123@ds249942.mlab.com:49942/steemitin'
mongoose.connect(mongourl, { useNewUrlParser: true }, function (err) {
    if (err)
        console.log(err)
    console.log('Application connected to db')
})
var unauthorizedURL = {}
unauthorizedURL['/api/login/'] = 1
unauthorizedURL['/login/'] = 1
unauthorizedURL['/'] = 1


app.use(function (req, res, next) {
    if (unauthorizedURL[req.url] == 1) {
        loginSessions.findOne
        next();
    }
    else {
        next();
        // if (req.session) {
        //     if (req.session.access_token) {
        //         next();

        //     }
        // }
        // else {
        //     res.status(400).send({ status: -1, message: 'invalid session please login' })
        // }
    }

})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/www'))
// app.use(express.static(path.join(__dirname, 'www')));
// app.use('/login', express.static(path.join(__dirname, 'wwww')));
app.use('/api/login', require('./server/routes/login'))
app.use('/api/v1/posts', require('./server/routes/posts'))
// app.use('/api/v1/login', require('./server/routes/login'))
//catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });


// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.send(err.status);
// });

module.exports = app;
