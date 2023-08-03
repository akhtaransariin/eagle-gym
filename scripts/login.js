const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");
const loginDiv = document.getElementById("login");
const loginContainer = document.querySelector(".container");

const closeBtn = document.querySelectorAll("#close-btn")

closeBtn.forEach(btn =>{
    btn.addEventListener("click",()=>{
        loginContainer.style.display = "none"
    })
});

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      


// if (localStorage.getItem('isLoggedIn')){
//   window.location.href = '/dashboard.html';
// }

forms.addEventListener("submit",(e)=>{
    e.preventDefault();
    login('http://localhost:1001',document.getElementById('loginid').value,document.getElementById('loginpass'))
    async function login(apiUrl,username,password) {
      const credentials = {
        username: username,
        password: password,
      };

      try {
        const response = await axios.post(`${apiUrl}/signin`, credentials);
        console.log(response);
        // localStorage.setItem('isLoggedIn', true);
        loginContainer.style.display = "none"
        window.location.href = '/dashboard.html';
        return;
      } catch (error) {
        // localStorage.setItem('isLoggedIn', false);
        console.log(error);
      }
    }
});