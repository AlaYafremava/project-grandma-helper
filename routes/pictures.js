const router = require('express').Router()
const Grandma = require('../models/grandma')
const Son = require('../models/son')
const Pic = require('../models/pic')

router.get('/', (req, res) => {
  const { user } = req.session
  res.render('pictures/pictures', user)
})

router.get('/new', (req, res) => {
  res.render('pictures/new')
})

router.post("/new", async function (req, res, next) {

  let filedata = req.file;
  // console.log(filedata);

  if (!filedata) {

    res.send("Ошибка при загрузке файла");
  } else {
    let src1 = `/uploads/${req.file.filename}`
    console.log(req.file.filename);
    res.render('pictures/new', { src1 })
  }
});

module.exports = router
