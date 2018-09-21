const express = require('express')
const app = express()

app.get(/^(.+)$/, function(req, res) {
    res.sendFile(__dirname + '/dist' + req.params[0] + 'index.html')
})

app.listen(3000, () => console.log('Listening on port 3000!'))
