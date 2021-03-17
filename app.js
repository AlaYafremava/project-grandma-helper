const express = require('express')
const app = express()
const dbConnection = require('./middleware/dbConnection')
const middleware = require('./middleware')
const errorHandler = require('./middleware/error')

middleware(app)
dbConnection()
errorHandler(app)

app.get('/', (req, res) => {
  res.render('pictures/pictures')
})

module.exports = app
