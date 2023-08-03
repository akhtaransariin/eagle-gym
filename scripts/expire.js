// Get DOM elements
const rows = document.getElementById("rows");
const form = document.querySelector("form");
const logout = document.getElementById("logout");

let final_date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

// Fetch data and populate the table on page load
namedata();

function namedata() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  fetch("http://localhost:1001/member", requestOptions)
    .then(response => response.json())
    .then(data => {
      // Add event listener for form submit
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let value = form.input.value.trim();
        if (value.length > 0) {
          // Filter data based on the input value
          let filteredData = filterData(data, value);
          dom_data(filteredData);
        } else {
          // If input is empty, show all data
          dom_data(data);
        }
      });

      // Populate the table with the initial data
      dom_data(data);
    })
    .catch(error => console.log('error', error));
}

// Function to filter the data based on the input value
function filterData(data, value) {
  return data.filter(element => {
    if (value.length < 3) {
      return element.id == value;
    } else if (value.length === 10) {
      return element.mobileValue === value;
    } else {
      return element.nameValue.toLowerCase().includes(value.toLowerCase());
    }
  });
}

function dom_data(data) {
  rows.innerHTML = "";

  data.forEach(element => {
    let expire_date = +element.endDateValue.replace('-', '').replace('-', '');

    // Create table row and cells
    let tr = document.createElement("tr");
    let id = document.createElement("td");
    let name = document.createElement("td");
    let mobile = document.createElement("td");
    let start = document.createElement("td");
    let end = document.createElement("td");
    let gender = document.createElement("td");
    let button = document.createElement("td");
    let buttonRenew = document.createElement("td");
    let msg = document.createElement("td");

    button.style.textAlign = "center";
    button.classList = "button";
    msg.style.textAlign = "center";
    msg.classList = "button";

    buttonRenew.style.textAlign = "center";
    buttonRenew.classList = "button";

    id.innerText = element.id;
    name.innerText = element.nameValue;
    mobile.innerText = element.mobileValue;
    start.innerText = element.startDateValue;
    end.innerText = element.endDateValue;
    gender.innerText = element.genderValue;
    button.innerText = "Delete Membership";
    buttonRenew.innerText = "Renew Membership";
    msg.innerText = "Send Reminder";

    tr.append(id, name, mobile, start, end, gender, button, buttonRenew, msg);
    rows.append(tr);

    // Check if the membership has expired
    if (final_date >= expire_date) {
      button.style.backgroundColor = "RED";
    }

    // Add event listener to delete the membership
    button.addEventListener("click", () => {
      deleteItemById(element.id);
    });

    // Add event listener to renew the membership
    buttonRenew.addEventListener("click", () => {
      openForm(element);
    });

    // Add event listener to send reminder
    msg.addEventListener("click", () => {
      sendReminder(element.mobileValue);
    });
  });
}

function openForm(element) {
  document.getElementById("myForm").classList.add("active");
  document.getElementById("renname").innerText = "Renew " + element.nameValue;

  let form = document.getElementById("renew");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    fetch(`http://localhost:1001/update/${element.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDateValue: startDate,
        endDateValue: endDate,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the successful response here
      alert(`${element.nameValue} Renewed`);
      closeForm();
      namedata();
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
      alert('An error occurred during renewal. Please try again later.');
    });
  });
}

function closeForm() {
  document.getElementById("myForm").classList.remove("active");
}

function deleteItemById(id) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  };

  fetch(`http://localhost:1001/delete/${id}`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(res => {
      alert(`${res.nameValue} Membership has been Removed`);
      namedata(); // Refresh the data after deletion
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Something Went Wrong | Try Again");
    });
}

function sendReminder(mobileValue) {
  window.open("https://api.whatsapp.com/send?phone=" + mobileValue + "&text=Your Gym Membership is expired. Please renew to enjoy uninterrupted gym service. Thank you, Eagle Yard Gym");
}

logout.addEventListener("click", () => {
  window.location.href = 'http://localhost:1001/logout'; 
});
