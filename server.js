const express = require('express')
const app = express()

app.get('/todos', (req, res) => res.send(JSON.stringify(["breath", "eat", "sleep"])))

app.listen(3000, () => console.log('Port 3000!'))