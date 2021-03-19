const express = require('express')
const app = express()
const dbConnection = require('./middleware/dbConnection')
const middleware = require('./middleware')
const errorHandler = require('./middleware/error')
const authRouter = require('./routes/auth');
const picturesRouter = require('./routes/pictures')
const instuctionRouter = require('./routes/instruction')

middleware(app)
dbConnection()

app.use((req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.email = req.session.user.email
    res.locals.grandMother = req.session.user.oldwoman
  }
  next()
})

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.use('/', authRouter)
app.use('/pictures', picturesRouter)
app.use('/', instuctionRouter)

errorHandler(app)

module.exports = app
