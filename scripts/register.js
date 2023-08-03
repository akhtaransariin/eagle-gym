const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const mobileInput = document.querySelector('#mobile');
const startDateInput = document.querySelector('#start-date');
const endDateInput = document.querySelector('#end-date');
const genderSelect = document.querySelector('#gender');
const submitButton = document.querySelector('#submit-btn');

submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  const flag =
    nameInput.value !== "" &&
    mobileInput.value !== "" &&
    startDateInput.value !== "" &&
    endDateInput.value !== "" &&
    genderSelect.value !== "";

  if (flag) {
    const apiUrl = 'http://localhost:1001/add';
    const data = {
      nameValue: nameInput.value,
      mobileValue: mobileInput.value,
      startDateValue: startDateInput.value,
      endDateValue: endDateInput.value,
      genderValue: genderSelect.value,
    };

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");
    myHeaders.append("Content-Type", "application/json"); // Set the correct Content-Type header

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the successful response here
        alert(`${data.nameValue}'s Registration Successful`);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again later.');
      });
  } else {
    alert("Please Fill All Information");
  }
});
