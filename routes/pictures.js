const router = require('express').Router()
const Grandma = require('../models/grandma')
const Son = require('../models/son')
const Pic = require('../models/pic')
//read img
const { createWorker } = require('../node_modules/tesseract.js');
const worker = createWorker({
  logger: (data) => console.log(data)
});

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
    // console.log(req.file.filename);
    
    const{user} = req.session
    
   const babka = await Grandma.findOne({email: user.email})
   console.log(babka);

    const newPic =  await Pic.create ({
      src: src1,
      author: user
    })

    babka.pics.push(newPic)
    await babka.save()

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

  res.render('pictires/pic', { src: pic.src, user })

})

module.exports = router


//read img
async function recognize() {
  const file = document.getElementById('file').files[0];
  const lang = document.getElementById('langs').value;
  await worker.load();
  await worker.loadLanguage(lang);
  await worker.initialize(lang);
  const { data: { text } } = await worker.recognize(file);
  console.log(text);
  await worker.terminate();
  return text;
}
