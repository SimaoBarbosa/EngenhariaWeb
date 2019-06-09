require("dotenv-safe").load();
var jwt = require('jsonwebtoken');
var http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
const bodyParser = require('body-parser')
var logger = require('morgan');
const helmet = require('helmet');
const axios = require('axios')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Microservices available
const users_microservice = 'http://localhost:3001/'
const events_microservice = 'http://localhost:3002/'

const jsonplaceholder = httpProxy('http://jsonplaceholder.typicode.com/');
const reqres = httpProxy('https://reqres.in/');
const usersMS = httpProxy(users_microservice);
const eventsMS = httpProxy(events_microservice);

// Login to authenticate users
app.post('/login', async (req, res, next) => {
    
    let login = await axios.post(users_microservice + 'users/login', {user: req.body.user, password: req.body.password})

    if (login.data.success){ // success

        const id = login.data.oid;
        const group = login.data.group;
        var token = jwt.sign({ id, group }, process.env.SECRET, {
            expiresIn: 600 // expires in 10 minutes
        });
        res.status(200).send({
            success: true,
            token: token 
        });

    } else {

        if (login.data.error == 1){
            res.send({
                success: false,
                error: 'username don\'t exist'
            })
        } else {
            res.send({
                success: false,
                error: 'password is not correct'
            })
        }

    }
})

// Verify if the token is correct
function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        req.group = decoded.group;
        next();
    });
}

// -------------------------------
// Proxy requests

app.get('/todos', verifyJWT, (req, res, next) => {
    if (req.group != 2)
        return res.status(500).send({ auth: false, message: 'Not right group to access the data' })
    jsonplaceholder(req, res, next);
})
// example:
// GET http://localhost:3000/todos
// will request
// https://jsonplaceholder.typicode.com/todos

app.get('/todos/:id', verifyJWT, (req, res, next) => {
    if (req.group != 2)
        return res.status(500).send({ auth: false, message: 'Not right group to access the data' })
    jsonplaceholder(req, res, next);
})
// example:
// GET http://localhost:3000/todos/1
// will request
// https://jsonplaceholder.typicode.com/todos/1
  
app.get('/api/users', verifyJWT, (req, res, next) => {
    if (req.group != 1)
        return res.status(500).send({ auth: false, message: 'Not right group to access the data' })
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

app.get('/api/users/:id', verifyJWT, (req, res, next) => {
    if (req.group != 1)
        return res.status(500).send({ auth: false, message: 'Not right group to access the data' })
    reqres(req, res, next);
})
// example:
// GET http://localhost:3000/api/users/1
// will request
// https://reqres.in/api/users/1

// forwards request to users micro-service
app.get('/api_users*', (req, res, next) => {
    req.url = req.url.replace('/api_users', '')
    usersMS(req, res, next);
})

// forwards request to eventos micro-service
app.get('/api_eventos*', (req, res, next) => {
    req.url = req.url.replace('/api_eventos', '')
    eventsMS(req, res, next);
})

// -------------------------------

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var server = http.createServer(app);
// listening on port 3000
server.listen(3000);