const btnReadFile = document.querySelector('#readFile')
// console.log(btnReadFile);

btnReadFile?.addEventListener('click', async()=>{
 
  const divPic = document.querySelector('.divPic')
  const id = divPic.id

  const response = await fetch(`/pictures/${id}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const text = await response.json()

  document.querySelector('.readedText').innerHTML += `
  <div><p>${text}</p><div>
  <button class="waves-effect waves-light btn-large deleteFileButton">Listen it</button>
  `

  console.log(text);
})

//удалить картинку со страницы pictures/:id
const deleteBtn = document.querySelectorAll('.deleteFileButton')
// console.log(deleteBtn);

deleteBtn?.forEach((el) => {
  el.addEventListener('click', async () => {

    const divPic = document.querySelector('.divPic').parentNode.parentNode.parentNode
    // console.log(divPic);
    const id = divPic.id
    // console.log(id);
  
    const response = await fetch(`/pictures/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify(id)

    })
    const result = await response.json()
  
    if (result.success) {
      divPic.remove()
    }
  })
})


//удалить картинку со страницы pictures
// const deleteButtons = document.querySelectorAll('#delete')
// console.log(deleteButtons);

// const formNewPic = document.querySelector('.formNewPic')
// console.log(formNewPic);

