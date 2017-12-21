const express = require('express')
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*' }))
app.use(cors())
let todos = ["breath", "eat", "sleep"]

app.get('/todos', (req, res) => res.send(JSON.stringify(todos)))

app.post('/addTodo', (req, res) => {
    todos.push(JSON.parse(req.body.toString()));
    res.send("ok")
})

app.post('/clearTodos', (req, res) => {
    todos = [];
    res.send("ok")
})

app.listen(3001, () => console.log('Port 3001!'))