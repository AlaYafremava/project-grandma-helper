const inputStatus = document.getElementsByClassName('with-gap')[1]
const inputStatusMa = document.getElementsByClassName('with-gap')[0]
// console.log(inputStatus);
inputStatus.addEventListener('click', (e) => {
  // console.log(e.target.value);
  if (e.target.value) {
    document.querySelector('.gEmail').innerHTML = `
    <div class="input-field col s6">
    <input name="grandmaEmail" type="email" class="validate">
    <label for="grandmaEmail">Grandma's Email</label>
  </div>
  `
  }
})

inputStatusMa.addEventListener('click', (e) => {
  if (e.target.value) {
    document.querySelector('.gEmail').innerText = ''
  }
})
