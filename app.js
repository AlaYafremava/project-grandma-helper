const express = require('express')
const app = express()
const dbConnection = require('./middleware/dbConnection')
const middleware = require('./middleware')
const errorHandler = require('./middleware/error')

middleware(app)
dbConnection()

app.get('/', (req, res) => {
  res.redirect('/login')
})
errorHandler(app)

errorHandler(app)

module.exports = app
