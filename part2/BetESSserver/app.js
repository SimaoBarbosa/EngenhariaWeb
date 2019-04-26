var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notificacoesRouter = require('./routes/notificacoes');
var competicoesRouter = require('./routes/competicoes');
var equipasRouter = require('./routes/equipas');
var eventosRouter = require('./routes/eventos');

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
app.use('/competicoes', competicoesRouter);
app.use('/equipas', equipasRouter);
app.use('/eventos', eventosRouter);

module.exports.db = pool;
module.exports = app;