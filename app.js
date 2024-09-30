function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
      if (uiBathrooms[i].checked) {
          return parseInt(uiBathrooms[i].value);
      }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
      if (uiBHK[i].checked) {
          return parseInt(uiBHK[i].value);
      }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft").value;
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations").value;

  var url = "http://127.0.0.1:5000/predict_home_price";

  fetch("http://127.0.0.1:5000/predict_home_price", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        'total_sqft': parseFloat(sqft),
        'bhk': bhk,
        'bath': bathrooms,
        'location': location
    })
})
.then(response => response.json())
.then(data => {
    console.log(data.estimated_price);
    var estPrice = document.getElementById("uiEstimatedPrice");
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
})
.catch(error => {
    console.error(error);
});
}






function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_location_names"; // Use this if you are using nginx. i.e tutorial 8 and onwards
  $.get(url, function (data, status) {
      console.log("got response for get_location_names request");
      if (data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for (var i = 0; i < locations.length; i++) {
              var opt = new Option(locations[i]);
              opt.value = locations[i]; // Set the value attribute of the option
              uiLocations.appendChild(opt);
          }
      }
  });
}

window.onload = onPageLoad;
