const express = require('express')
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*' }))
app.use(cors())
let todos = {}

app.get('/todos', (req, res) => {
    let username = req.query.username
    let userTodos = todos[username]
    if(userTodos == undefined) userTodos = []
    res.send(JSON.stringify(userTodos))
})

app.post('/addTodo', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let item = payload.item;
    let username = payload.username;
    let userTodos = todos[username]
    if(userTodos == undefined) userTodos = []
    userTodos.push(item);
    todos[username] = userTodos;
    res.send("ok")
})

app.post('/clearTodos', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let username = payload.username;
    todos[username] = [];
    res.send("ok")
})

app.listen(3001, () => console.log('Port 3001!'))