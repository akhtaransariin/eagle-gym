let rows = document.getElementById("rows")
let form = document.querySelector("form")
let date = new Date();
let month = date.getMonth();
if (month < 10){
    month = "0"+(month+1);
}else {
    month = month+1;
}

window.addEventListener("load",fetch_data);

function fetch_data() {

    fetch('https://giant-hare-tank-top.cyclic.app/user')
    .then(response => response.json())
    .then(data => {

    let arr = data
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        let value = form.input.value;
        
        if (value.length < 5){
            let filter = arr.filter(el=>{return el.id == value})
            dom_data(filter);
        }else {
            let filter = arr.filter(el=>{return el.mobileValue === value})
            dom_data(filter);
        }

        if (value === ""){
            dom_data(data);    
        }

    });

        dom_data(data);
    })

}
function dom_data(params){
    let MyDate =`${date.getFullYear()}-${month}-${date.getDate()}` 
    
    rows.innerHTML = null;
    params.forEach(element => {
    let tr = document.createElement("tr");
    let id = document.createElement("td");
    let name = document.createElement("td");
    let mobile = document.createElement("td");
    let start = document.createElement("td");
    let end= document.createElement("td");
    let gender =  document.createElement("td");
    let button = document.createElement("td");

    button.style.textAlign = "center";
    button.classList = "button";
    id.innerText = element.id;
    name.innerText   = element.nameValue;
    mobile.innerText = element.mobileValue; 
    start.innerText  = element.startDateValue; 
    end.innerText    = element.endDateValue;
    gender.innerText = element.genderValue;
    button.innerText = "Delete Membership";
    tr.append(id,name,mobile,start,end,gender,button);
    rows.append(tr);
if (MyDate === element.endDateValue){
    button.style.backgroundColor = "RED";
}
    button.addEventListener("click",()=>{
        fetch(`https://giant-hare-tank-top.cyclic.app/user/${element.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        alert(`${element.nameValue} Membership Removed`);
        fetch_data();
        })
    });
}




