
//read img
// const { createWorker } = require('../node_modules/tesseract.js');
// const worker = createWorker({
//   logger: (data) => console.log(data)
// });




const readFile = document.querySelector('#readFile')

readFile.addEventListener('click', async()=>{
 
  const divPic = document.querySelector('.divPic')
  const id = divPic.id

  console.log(divPic);



  const response = await fetch(`/pictures/${id}`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
   
  })
  const responseJson = await response.json()

  
})


// async function recognize(req,res) {
//   const file = document.getElementById('file').files[0];
//   const lang = 'rus'
//   await worker.load();
//   await worker.loadLanguage(lang);
//   await worker.initialize(lang);
//   const { data: { text } } = await worker.recognize(file);
//   console.log(text);
//   await worker.terminate();
//   return text;
// }
