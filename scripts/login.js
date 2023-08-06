
if (localStorage.getItem("status") == "true") {
  window.location.href = "/member_page.html"
}
 
 const forms = document.querySelector(".forms");
  const pwShowHide = document.querySelectorAll(".eye-icon");
  const loginContainer = document.querySelector(".container");
  const closeBtn = document.querySelectorAll("#close-btn");

  closeBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      loginContainer.style.display = "none";
    });
  });

  pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
      let pwFields = eyeIcon.closest(".forms").querySelectorAll(".password");

      pwFields.forEach(password => {
        password.type = password.type === "password" ? "text" : "password";
        eyeIcon.classList.toggle("bx-hide");
        eyeIcon.classList.toggle("bx-show");
      });
    });
  });

  forms.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginid").value;
    const password = document.getElementById("loginpass").value;
    var base64Credentials = btoa(username + ':' + password);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + base64Credentials);
  
    var raw = JSON.stringify({
      "username": username,
      "password": password
    });
  
    var requestOptions = {
      method: 'POST', // Use POST to authenticate
      headers: myHeaders,
      body: raw,
    };
      const response = await fetch("http://localhost:1001/signin", requestOptions);
      if (!response.ok) {
        alert('Authentication failed');
      }else {
        localStorage.setItem("gym",base64Credentials)
        localStorage.setItem('status', true);
        window.location.href = "/member_page.html"
      }       
  });

  