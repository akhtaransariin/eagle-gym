const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const mobileInput = document.querySelector('#mobile');
const startDateInput = document.querySelector('#start-date');
const endDateInput = document.querySelector('#end-date');
const genderSelect = document.querySelector('#gender');
const submitButton = document.querySelector('#submit-btn');

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  let flag = nameInput.value !=="" && mobileInput.value !=="" && startDateInput.value !=="" && endDateInput.value !=="" && genderSelect.value !=="";
if (flag){
  fetch('https://giant-hare-tank-top.cyclic.app/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nameValue : nameInput.value,
    mobileValue : mobileInput.value,
    startDateValue : startDateInput.value,
    endDateValue : endDateInput.value,
    genderValue : genderSelect.value,
  })
  
})
alert(`${nameInput.value}'s `+"Registration Succesfull");
}else {
  alert("Please Fill All Information");
}
});

