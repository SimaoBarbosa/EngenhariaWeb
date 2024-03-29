var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notificacoesRouter = require('./routes/notificacoes');
var apostasRouter =  require('./routes/aposta_concreta')

var app = express();

var cors = require('cors')
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notificacoes', notificacoesRouter);
app.use('/apostas', apostasRouter);
module.exports = app;