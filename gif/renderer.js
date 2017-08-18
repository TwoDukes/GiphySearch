const http = require('http');
const searchButton = document.getElementById('searchButton');
const inputField = document.getElementById('queryField');
const gifStream = document.getElementById('gifStream');


inputField.focus();

searchButton.addEventListener("click", () => {
  //searchs giphy with curren search value
  searchGiphy(inputField.value);
});

inputField.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      searchGiphy(inputField.value);  
    }
});

function searchGiphy(queryTerm){

  cleanChildren(gifStream); //cleans out current gifStream
  
  inputField.value = "";
  inputField.placeholder = "";

  var term = encodeURIComponent(queryTerm);
  //address of makeSchool Giphy API
  var address = "http://api.giphy.com/v1/gifs/search?q=" + term + '&api_key=dc6zaTOxFJmzC';

  http.get(address, (res) => {
    res.setEncoding("UTF-8");
    //this fills with appened JSON data from giphy
    let body = "";

    res.on('data', (data) => {
      body += data;
    })
    res.on('end', () => {
      var parsed = JSON.parse(body);
      //for all gif urls sent back add them to an img src
      //and append it to gifStream
      for(var i = 0; i < parsed.data.length; i++){
        let gifSRC = parsed.data[i].images.fixed_height.url;
        let currentGif = document.createElement('img');
        currentGif.setAttribute('src', gifSRC);
        currentGif.setAttribute('class', "gif");
        gifStream.appendChild(currentGif)
      }
    })
  })
}

//clears out all child nodes of an element passed in
function cleanChildren(obj){
  while(obj.hasChildNodes()){
    obj.removeChild(obj.lastChild);
  }
}



