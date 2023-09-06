
const selectionEls = document.querySelectorAll("select");
const fromTextEl = document.getElementById("source-text");
const toTextEl = document.getElementById("result-text");
const translateBtn = document.getElementById("translate-btn");
const controlsEl = document.querySelectorAll(".controls i");
const copyBtn = document.getElementById("copy-text");
const voiceSpeechEl = document.getElementById("voiceSpeech");

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

  if(!text) return;
  toTextEl.setAttribute("placeholder", "Translating...")
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  
  fetch(apiUrl).then(res => res.json()).then(data =>{
    toTextEl.value = data.responseData.translatedText;
  })

})

controlsEl.forEach(control =>{
  control.addEventListener("click", ({target}) =>{
    console.log("i got clicked")
    if(target.classList.contains("fa-trash")){
      if(target.id == "from-trash"){
        fromTextEl.value = "";
        document.querySelector(".char-text").textContent = "0";
      }     
    }
  })
})


// Populate the language options in the dropdown
const supportedVoices = speechSynthesis.getVoices();
supportedVoices.forEach(voice => {
  const option = document.createElement("option");
  option.value = voice.lang;
  option.textContent = voice.lang;
  selectionEls.appendChild(option);
});


voiceSpeechEl.addEventListener("click", () => {
  const textToRead = toTextEl.value;
  const selectedLanguage = selectionEls.value;
  if (textToRead) {
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang =selectedLanguage; 

     const selectedVoiceSpeed = parseFloat(toTextEl.value);

     if (!isNaN(selectedVoiceSpeed)) {d
       utterance.rate = selectedVoiceSpeed;
     }

    speechSynthesis.speak(utterance);
  } else {
    console.log("No text to read.");
  }
});


const voiceToText = document.getElementById('voiceToText');
const sourceText = document.getElementById('source-text');

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';

recognition.onstart = function() {
    voiceToText.classList.add('active');
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    sourceText.value = transcript;
};

recognition.onend = function() {
    voiceToText.classList.remove('active');
};

voiceToText.addEventListener('click', () => {
    recognition.start();
});



//================= COPY CLIPBOARD ===========================================
function copyTranslatedText() {
  toTextEl.select();
  toTextEl.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(toTextEl.value)
}

copyBtn.addEventListener("click", copyTranslatedText);


//====================================== COUNT CHAR ==================================

function updateWordCount() {
  const sourceText = document.getElementById("source-text").value;
  const wordCount = sourceText.split(/\s+/).filter(Boolean).length;

  const wordCountDisplay = document.querySelector(".char-text");
  wordCountDisplay.textContent = wordCount;
}

const sourceTextArea = document.getElementById("source-text");
sourceTextArea.addEventListener("input", updateWordCount);

