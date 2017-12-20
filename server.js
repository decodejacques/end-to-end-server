const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*' }))

let todos = ["breath", "eat", "sleep"]

app.get('/todos', (req, res) => res.send(JSON.stringify(todos)))

app.post('/addTodo', (req, res) => {
    todos.push(JSON.parse(req.body.toString()));
    res.send("ok")
})

app.listen(3000, () => console.log('Port 3000!'))