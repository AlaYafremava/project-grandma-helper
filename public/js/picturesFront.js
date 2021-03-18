const button = document.querySelector('#add-pic')
// console.log(button);

button.addEventListener('click', async (event)=> {
// console.log(event.target);

await fetch('/pictures/new')

})
