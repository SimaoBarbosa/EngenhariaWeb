var http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
var logger = require('morgan');
const helmet = require('helmet');

// Microservices available
const jsonplaceholder = httpProxy('http://jsonplaceholder.typicode.com/');
const reqres = httpProxy('https://reqres.in/');

// -------------------------------
// Proxy requests

app.get('/todos', (req, res, next) => {
    jsonplaceholder(req, res, next);
})
// example:
// GET http://localhost:3000/todos
// will request
// https://jsonplaceholder.typicode.com/todos

app.get('/todos/:id', (req, res, next) => {
    jsonplaceholder(req, res, next);
})
// example:
// GET http://localhost:3000/todos/1
// will request
// https://jsonplaceholder.typicode.com/todos/1
  
app.get('/api/users', (req, res, next) => {
    reqres(req, res, next);
})
// example:
// GET http://localhost:3000/api/users
// will request
// https://reqres.in/api/users
//
// GET http://localhost:3000/api/users?page=1
// will request
// https://reqres.in/api/users?page=1

app.get('/api/users/:id', (req, res, next) => {
    reqres(req, res, next);
})
// example:
// GET http://localhost:3000/api/users/1
// will request
// https://reqres.in/api/users/1

// -------------------------------

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var server = http.createServer(app);
// listening on port 3000
server.listen(3000);