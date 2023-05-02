let rows = document.getElementById("rows")
let form = document.querySelector("form")
let date = new Date();
let month = date.getMonth();
if (month < 10){
    month = "0"+(month+1);
}else {
    month = month+1;
}

let day = date.getDate();
if (day < 10){
    day = "0"+day;
}
let final_date = +`${date.getFullYear()}${month}${day}`;
window.addEventListener("load",fetch_data);

function fetch_data() {

    fetch('https://eagle.up.railway.app/user')
    .then(response => response.json())
    .then(data => {

    let arr = data
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        let value = form.input.value;
        
        if (value.length < 3){
            let filter = arr.filter(el=>{return el.id == value})
            dom_data(filter);
        }else if( value.length == 10){
            let filter = arr.filter(el=>{return el.mobileValue === value})
            dom_data(filter);
        }else if (+value.length%+value.value !== 0){
            let filter = arr.filter(el=>{return el.nameValue.includes(value)})
            dom_data(filter);
        }

    });

        dom_data(data);
    })

}
function dom_data(params){    
    rows.innerHTML = null;
    params.forEach(element => {

    let expire_date = +element.endDateValue.replace('-','').replace('-','');
    
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

    if (final_date >= expire_date){
        button.style.backgroundColor = "RED";
    }


    button.addEventListener("click",()=>{
        fetch(`https://eagle.up.railway.app/user/${element.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        alert(`${element.nameValue} Membership has been Removed`);
        fetch_data();
        })
    });
}




