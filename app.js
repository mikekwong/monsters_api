const express = require('express')
// express middleware function to allow us to send json bodies as request objects and parse them
const bodyParser = require('body-parser')
// const monsters = require('./routes/monsters')
// const habitats = require('./routes/habitats')
// const lives = require('./routes/lives')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json())
// app.use('/monsters', monsters)
// app.use('/habitats', habitats)
// app.use('/lives', lives)
app.use('/', routes)

// place after app.get to fire properly
// this is an error handler 'endware' function
app.use((err, req, res, next) => {
  res.json(err)
})

module.exports = app
