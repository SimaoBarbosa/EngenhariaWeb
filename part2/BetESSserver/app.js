var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Conexão à base de dados MYSQL
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'betess'
})

module.exports.db = pool ; 

// Exemplo de uma query
/*
connection.query('SELECT * from user', function (err, rows, fields) {
    if (err) throw err
  
    console.log('The solution is: ', rows)
})*/
  

  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
