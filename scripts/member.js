

  const rows = document.getElementById("rows");
  const form = document.querySelector("form");
  const logout = document.getElementById("logout");

  namedata();

  function namedata() {
    if (localStorage.getItem("status") == "false"){
      window.location.href = "/index.html"
      return
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic "+localStorage.getItem("gym"));

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch("http://localhost:1001/member", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          let value = form.input.value.trim();
          if (value.length > 0) {
            let filteredData = filterData(data, value);
            dom_data(filteredData);
          } else {
            dom_data(data);
          }
        });

        dom_data(data);
      })
      .catch(error => console.log('error', error));
  }

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

    const currentDate = formatDate(new Date());

    data.forEach(element => {
      let expire_date = +element.endDateValue.replace(/-/g, '');

      let tr = document.createElement("tr");
      let { id, nameValue, mobileValue, startDateValue, endDateValue, genderValue } = element;
      let button = document.createElement("td");

      button.style.textAlign = "center";
      button.classList = "button";
      id = createTableCell(id);
      nameValue = createTableCell(nameValue);
      mobileValue = createTableCell(mobileValue);
      startDateValue = createTableCell(startDateValue);
      endDateValue = createTableCell(endDateValue);
      genderValue = createTableCell(genderValue);
      button.textContent = "Delete Membership";

      tr.append(id, nameValue, mobileValue, startDateValue, endDateValue, genderValue, button);
      rows.append(tr);

      if (currentDate >= expire_date) {
        button.style.backgroundColor = "RED";
      }

      button.addEventListener("click", () => {
        deleteItemById(element.id);
      });
    });
  }

  function createTableCell(text) {
    let td = document.createElement("td");
    td.textContent = text;
    return td;
  }

  function formatDate(date) {
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  }

  function deleteItemById(id) {
    const myHeaders = new Headers();

    myHeaders.append("Authorization", "Basic "+localStorage.getItem("gym"));

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

  logout.addEventListener("click", () => {
    localStorage.setItem("status",false)
    localStorage.setItem("gym",null)
    window.location.href = '/index.html';
  });
    

