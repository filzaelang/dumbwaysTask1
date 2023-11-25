const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello Bang!')
})

app.get('/about', (req, res) => {
    res.send('Hello My Name is Filza')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})