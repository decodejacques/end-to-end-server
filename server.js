const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs-extra')
const session = require('express-session')
const bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*' }))
app.use(cors())
let todos = {}

app.use(session({secret: 'keyboard cat'}))


function loadTodos() {
    fs.ensureFile('todos.json')
        .then(() =>
            fs.readFile('todos.json')
        )
        .then(raw => {
            if (raw == undefined) {
                todos = {};
            }
            else {
                todos = JSON.parse(raw);
            }
        })
}

function saveTodos() {
    return fs.writeFile(
        'todos.json',
        JSON.stringify(todos))
}

app.get('/todos', (req, res) => {
    let username = req.query.username
    let userTodos = todos[username]
    if (userTodos == undefined) userTodos = []
    res.send(JSON.stringify(userTodos))
})

app.post('/addTodo', (req, res) => {
    let username = req.session.username; 
    let payload = JSON.parse(req.body.toString());
    let item = payload.item;
    let userTodos = todos[username]
    if (userTodos == undefined) userTodos = []
    userTodos.push(item);
    todos[username] = userTodos;
    console.log(userTodos);
    saveTodos()
        .then(() => res.send("ok"))
})

app.post('/login', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let username = payload.username;
    let password = payload.password;
    if (username === "bob" && password === "bob123") {
        req.session.username = username;
        res.send("ok")
    }
    else {
        res.send("login failed")
    }
})

app.post('/clearTodos', (req, res) => {
    let username = req.session.username;
    todos[username] = [];
    saveTodos()
        .then(() => res.send("ok"))
})

loadTodos();

app.listen(3001, () => console.log('Port 3001!'))