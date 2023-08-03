const rows = document.getElementById("rows");
const form = document.querySelector("form");
const logout = document.getElementById("logout");

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

// Function to populate the table with data
function dom_data(data) {
  rows.innerHTML = "";

  // Get the current date in the format "yyyymmdd"
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  data.forEach(element => {
    let expire_date = +element.endDateValue.replace('-', '').replace('-', '');

    let tr = document.createElement("tr");
    let id = document.createElement("td");
    let name = document.createElement("td");
    let mobile = document.createElement("td");
    let start = document.createElement("td");
    let end = document.createElement("td");
    let gender = document.createElement("td");
    let button = document.createElement("td");

    button.style.textAlign = "center";
    button.classList = "button";
    id.innerText = element.id;
    name.innerText = element.nameValue;
    mobile.innerText = element.mobileValue;
    start.innerText = element.startDateValue;
    end.innerText = element.endDateValue;
    gender.innerText = element.genderValue;
    button.innerText = "Delete Membership";
    tr.append(id, name, mobile, start, end, gender, button);
    rows.append(tr);

    // Check if the membership has expired
    if (currentDate >= expire_date) {
      button.style.backgroundColor = "RED";
    }

    // Add event listener to delete the membership
    button.addEventListener("click", () => {
      deleteItemById(element.id);
    });
  });
}

// Function to delete an item by ID
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

// Logout event listener
logout.addEventListener("click", () => {
  // Redirect to the logout URL
  window.location.href = 'http://localhost:1001/logout';
});
