var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var competicoesRouter = require('./routes/competicoes');
var equipasRouter = require('./routes/equipas');
var eventosRouter = require('./routes/eventos');
var apostasRouter = require('./routes/apostas_disponiveis');


var app = express();

var cors = require('cors')
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/competicoes', competicoesRouter);
app.use('/equipas', equipasRouter);
app.use('/eventos', eventosRouter);
app.use('/apostasDisponiveis', apostasRouter);

module.exports = app;
