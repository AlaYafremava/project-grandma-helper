const router = require('express').Router()

router.get('/instruction', (req, res) => {
  res.render('instruction')
})

module.exports = router
