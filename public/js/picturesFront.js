const btnReadFile = document.querySelector('#readFile')
// console.log(btnReadFile);

btnReadFile.addEventListener('click', async()=>{
 
  const divPic = document.querySelector('.divPic')
  const id = divPic.id

  const response = await fetch(`/pictures/${id}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const responseJson = await response.json()
})

const deleteBtn = document.querySelector('#deleteFile')

deleteBtn.addEventListener('click', async () => {

  const  divPic = document.querySelector('.divPic')
  const id = divPic.id
  // console.log(id);

  const response = await fetch(`/pictures/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "Application/json"
    }
  })
  const result = await response.json()

  if (result.success) {
    divPic.remove()
  }
})


