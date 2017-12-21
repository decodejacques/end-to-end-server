const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs-extra')

const bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*' }))
app.use(cors())
let todos = {}

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
                console.log(raw.toString());
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
// hey
app.post('/addTodo', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let item = payload.item;
    let username = payload.username;
    let userTodos = todos[username]
    if (userTodos == undefined) userTodos = []
    userTodos.push(item);
    todos[username] = userTodos;
    console.log(userTodos);
    saveTodos()
        .then(() => res.send("ok"))
})

app.post('/clearTodos', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let username = payload.username;
    todos[username] = [];
    saveTodos()
        .then(() => res.send("ok"))
})

loadTodos();

app.listen(3001, () => console.log('Port 3001!'))