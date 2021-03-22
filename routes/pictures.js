const router = require('express').Router()
const Grandma = require('../models/grandma')
const Son = require('../models/son')
const Pic = require('../models/pic')
const fs = require('fs')
const path = require('path')
const Tesseract = require('tesseract.js')
const { send } = require('process')

// automatically pick platform
const say = require('say')

// or, override the platform
// const Say = require('say').Say
// const say = new Say('darwin' || 'win32' || 'linux')


router.get('/', async (req, res) => {
  const { user } = req.session
  let pictures

  if (user.oldwoman && user.oldwoman === true) {
    pictures = await Pic.find({ author: user._id })

  } else {
    const grandmaId = (await Son.findOne({ email: user.email }).populate('grandma')).grandma._id
    pictures = await Pic.find({ author: grandmaId })
  }

  // console.log(pictures);

  res.render('pictures/pictures', { user, pictures, title: 'Collections of pictures' })
})

router.delete('/', async (req, res) => {
  try {
    const id = req.body.id

    await Pic.findByIdAndDelete(id)
    console.log(id);

    return res.json({ success: true })
  } catch (error) {
    return error
  }
  // res.redirect('/pictures')
})


router.get('/new', (req, res) => {
  res.render('pictures/new', {title: 'Add new pic'})
})

router.post("/new", async function (req, res, next) {

  let filedata = req.file;
  // console.log(filedata);

  if (!filedata) {

    res.send("Ошибка при загрузке файла");
  } else {
    let src1 = `/uploads/${req.file.filename}`

    const { user } = req.session
    const babka = await Grandma.findOne({ email: user.email })

    const newPic = await Pic.create({
      src: src1,
      author: user
    })

    babka.pics.push(newPic)
    await babka.save()
    // filedata
    res.redirect('/pictures')
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
      error: {},
      title: 'Error'
    });
  }

  res.render('pictures/pic', { src: pic.src, id: pic.id, user, title: "Picture" })

})

//reader
// const reader = (src) => {
//   Tesseract.recognize(
//     src,
//     'eng'
//     // { logger: m => console.log(m) }
//   ).then(({ data: { text } }) => {
//     // console.log(text);
//     // console.log(typeof text);
//     return text;
//   })
// }

router.post('/:id', async (req, res) => {

  let pic = await Pic.findById(req.params.id)
  // console.log(pic);
  // console.log(pic.src);
  let link = `./public${pic.src}`
  const img = fs.readFileSync(path.join(__dirname, '..', link), {
    encoding: null
  })

  if (!pic.text === '') {
    res.json(pic.text)

  }

  Tesseract.recognize(
    img,
    'rus', { logger: data => console.log(data) })
    .then(async ({ data: { text } }) => {
      pic.text = text
      await pic.save()
      res.json(text)
    })
})

router.post('/:id', async (req, res) => {
  let pic = await Pic.findById(req.params.id)

  say.speak(pic.text)

  console.log('Text has been spoken.')
});


router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Pic.findByIdAndDelete(id)
    res.json({ success: true })
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить запись из базы данных.',
      error: {},
      title: 'Error'
    })
  }
  

})

module.exports = router
