const router = require('express').Router()

router.get('/instruction', (req, res) => {
  res.render('instruction', {title: 'Instruction for users'})
})

module.exports = router
