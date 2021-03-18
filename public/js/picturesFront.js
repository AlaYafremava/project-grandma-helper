const btnAddPic = document.querySelector('#add-pic')

btnAddPic.addEventListener('click', async (event)=> {
// console.log(event.target);

await fetch('/pictures/new')

})


