// client-side js
// run by the browser each time your view template is loaded

// our default array of dreams
// define variables that reference elements on our page
const dreamsList = document.getElementById("dreams");
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements["dream"];
const option = dreamsForm.elements["option"];

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();
  // get dream value and add it to the list
  if(dreamInput.value==='')return
  else{
    var hanchar = encodeURI(dreamInput.value)
    if(option.value==='middle')window.open("https://han-pron.glitch.me/middle/"+encodeURI(hanchar));
    else window.open("https://han-pron.glitch.me/dialect/"+encodeURI(hanchar));
  }

  // reset form
  dreamInput.value = "";
  dreamInput.focus();
};
