const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
let fromCurr = document.querySelector(`.from select`);
let toCurr = document.querySelector(`.to select`);
const msg = document.querySelector('.msg');

for (let select of dropdowns){
    for (currCode in countryList){

        let newOption = document.createElement('option');
        newOption.style.overflow = "hidden";
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evn) => {
        updateFlag(evn.target);
    })
    
}

const updateFlag= (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

btn.addEventListener( 'click', (evt)=>{  
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if(amt === "" || amt<1){
        amt = 1;
        amount.value = 1;
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalamt = amt * rate;
    msg.innerText = `${amt} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
    
};
window.addEventListener( "load", ()=>{
    updateExchangeRate();
});
