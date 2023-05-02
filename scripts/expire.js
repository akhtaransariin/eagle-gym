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

let startDate = document.getElementById("startdate");
let endDate = document.getElementById("enddate");
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
    

    
if ( final_date >= expire_date){
    let tr = document.createElement("tr");
    let id = document.createElement("td");
    let name = document.createElement("td");
    let mobile = document.createElement("td");
    let start = document.createElement("td");
    let end= document.createElement("td");
    let gender =  document.createElement("td");
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
    name.innerText   = element.nameValue;
    mobile.innerText = element.mobileValue; 
    start.innerText  = element.startDateValue; 
    end.innerText    = element.endDateValue;
    gender.innerText = element.genderValue;
    button.innerText = "Delete Membership";
    buttonRenew.innerText = "Renew Membership"
    msg.innerText = "Send Reminder"
    msg.addEventListener("click",()=>{
        window.open("https://api.whatsapp.com/send?phone=" + element.mobileValue + "&text=Your Gym Membership  is expired. Please renew to  enjoying uninterrupted gym service. Thank you, Eagle Yard Gym")
    });

    tr.append(id,name,mobile,start,end,gender,button,buttonRenew,msg);
    rows.append(tr);

    buttonRenew.addEventListener("click",openForm);
    function openForm() {
        
        document.getElementById("myForm").classList.add("active");
        document.getElementById("renname").innerText = "Renew "+element.nameValue
        let form = document.getElementById("renew");
        form.addEventListener("submit",(e)=>{
            e.preventDefault();
        let startDate = document.getElementById("startDate").value
        let endDate  = document.getElementById("endDate").value

        
        fetch(`https://eagle.up.railway.app/user/${element.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            startDateValue : startDate,
            endDateValue : endDate,
            })
          })
            .then(response => response.json())
            .then(data => {
              alert(element.nameValue+" Renewed")
              closeForm();
            })


        });

        


        
        



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
    }
    
    });
}

    function closeForm() {
      document.getElementById("myForm").classList.remove("active");
    }
  



