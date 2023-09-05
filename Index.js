
const selectionEls = document.querySelectorAll("select");
const fromTextEl = document.getElementById("source-text");
const toTextEl = document.getElementById("result-text");
const translateBtn = document.getElementById("translate-btn");

let selected;

function addCountries(){
  selectionEls.forEach((select, id )=>{
    for (const countrycode in countries) {
      const option = document.createElement("option");
      option.value = countrycode;
      option.textContent = countries[countrycode];

       // Check the conditions and add the "selected" attribute accordingly
       if ((id === 0 && countrycode === "en-GB") || (id === 1 && countrycode === "hi-IN")) {
        option.selected = true;
      }


      select.appendChild(option)
    }
  })
  
}

addCountries();



translateBtn.addEventListener('click', ()=>{
  let text = fromTextEl.value;
  let translateFrom = selectionEls[0].value;
  let translateTo = selectionEls[1].value;
  console.log(text, translateFrom, translateTo)

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  

  fetch(apiUrl).then(res => res.json()).then(data =>{
    console.log(data);
    toTextEl.value = data.responseData.translatedText;
  })
})