
//read img
const { createWorker } = require('../node_modules/tesseract.js');
const worker = createWorker({
  logger: (data) => console.log(data)
});

const readFile = document.querySelector('#readFile')

readFile.addEventListener('click', async(e)=>{
  e.preventDefault()
  
})


async function recognize(req,res) {
  const file = document.getElementById('file').files[0];
  const lang = 'rus'
  await worker.load();
  await worker.loadLanguage(lang);
  await worker.initialize(lang);
  const { data: { text } } = await worker.recognize(file);
  console.log(text);
  await worker.terminate();
  return text;
}
