const express = require('express')
const app = express()
const dbConnection = require('./middleware/dbConnection')
const middleware = require('./middleware')
const errorHandler = require('./middleware/error')
const picturesRouter = require('./routes/pictures')
middleware(app)
dbConnection()

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.use('/pictures', picturesRouter)

errorHandler(app)
module.exports = app
