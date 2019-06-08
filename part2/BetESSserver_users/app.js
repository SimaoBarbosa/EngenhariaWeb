var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notificacoesRouter = require('./routes/notificacoes');
var apostasRouter =  require('./routes/aposta_concreta')

var app = express();

// Conexão à base de dados MySQL
var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    database: 'betess',
    user: 'root',
    password: 'password'
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notificacoes', notificacoesRouter);
app.use('/apostas', apostasRouter);
module.exports.db = pool;
module.exports = app;