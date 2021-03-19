const router = require('express').Router()
const Grandma = require('../models/grandma')
const Son = require('../models/son')
const Pic = require('../models/pic')
const Tesseract = require('tesseract.js');

const reader = (src) => {
  Tesseract.recognize(
    src,
    'eng'
    // { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
    console.log(typeof text);
    return text;
  })
}

router.get('/', async (req, res) => {
  const { user } = req.session
  let pictures

  if (user.oldwoman && user.oldwoman === true) {
    pictures = await Pic.find({ author: user._id })

  } else  {
    const grandmaId = (await Son.findOne({ email: user.email }).populate('grandma')).grandma._id
    pictures = await Pic.find({ author: grandmaId })
  }

  // console.log(pictures);

  res.render('pictures/pictures', { user, pictures })
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
    let readerPath = `./public${src1}`
    // console.log(readerPath);

    const text = reader(readerPath)

    const { user } = req.session
    const babka = await Grandma.findOne({ email: user.email })

    const newPic = await Pic.create({
      src: src1,
      author: user,
      text
    })

    babka.pics.push(newPic)
    await babka.save()
    // filedata
    res.render('pictures/new', { src1 })
  }
});

router.get('/:id', async (req, res) => {
  const { user } = req.session
  let pic

  try {
    pic = await Pic.findById(req.params.id)
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить запись из базы данных.',
      error: {}
    });
  }

  res.render('pictures/pic', { src: pic.src, id: pic.id, user })

})

//reader
router.post('/:id', async (req, res) => {

  let pic = await Pic.findById(req.params.id)
  console.log(pic.src);
  let path = `./public${pic.src}`

  reader(path)

  // return res.json({ pic: pic })

  // res.render('pictures/pic', { src: pic.src, id: pic._id, user })

})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Pic.findByIdAndDelete(id)
    res.json({ success: true })
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить запись из базы данных.',
      error: {}
    })
  }
  res.redirect('/pictures')

})

module.exports = router
