// // TODO: Add the access token and device ID
// var myParticleAccessToken = "31a4eb7f9635dd8fea3a6ff5ad63caaa5bead504"
// var myDeviceId =            "3a0043001051363036373538"
// // var topic =                 "cse222Lights/thisLamp/color"

//var Particle = require('particle-api-js');
var particle = new Particle();
var token;

particle.login({username: 'sorayamoss@wustl.edu', password: '8ysgkh83SKRSJ7'}).then(
  function(data) {
    token = data.body.access_token;
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);



function load_settings() {
  document.getElementById('status-screen').hidden = false;
  document.getElementById('login-screen').hidden = true;
  document.getElementById('account-creation').hidden = true;
  document.getElementById('advanced-settings-screen').hidden = true;
}

function load_ac() {
  document.getElementById('status-screen').hidden = true;
  document.getElementById('login-screen').hidden = true;
  document.getElementById('account-creation').hidden = false;
  document.getElementById('advanced-settings-screen').hidden = true;
}

function load_login() {
  document.getElementById('status-screen').hidden = true;
  document.getElementById('login-screen').hidden = false;
  document.getElementById('account-creation').hidden = true;
  document.getElementById('advanced-settings-screen').hidden = true;
}

function load_advanced() {
  console.log("made it")
  document.getElementById('status-screen').hidden = true;
  document.getElementById('login-screen').hidden = true;
  document.getElementById('account-creation').hidden = true;
  document.getElementById('advanced-settings-screen').hidden = false;
}

function logStateChange(){
  console.log('State Change');

document.getElementById("autocloseSlider").value=garage.autoCloseTime;
autocloseTime.innerText = garage.autoCloseTime + " s"
  if(garage.faultO||garage.faultC){
document.getElementById("door-status").innerHTML="Fault Hit";

  }
  if(garage.stopO||garage.stopC){
document.getElementById("door-status").innerHTML="Stopped";

  }
  if(garage.opening){
    document.getElementById("door-status").innerHTML="Opening";
    //document.getElementById('garageStatusButton').hidden = true;
  }
  if(garage.autoCloseEnabled){
    document.getElementById("autoClose_button").value="Turn Off";
  }else{
    document.getElementById("autoClose_button").value="Turn On";
  }


  if(garage.open){
    document.getElementById("door-status").innerHTML="Open";
    document.getElementById('garageStatusButton').hidden = false;
  }

  if(garage.closed){
    document.getElementById("door-status").innerHTML="Closed";
    document.getElementById('garageStatusButton').hidden = false;
  }

  if(garage.closing){
    document.getElementById("door-status").innerHTML="Closing";
    //document.getElementById('garageStatusButton').hidden = true;
  }

  if(garage.lightOn){
    document.getElementById("light-status").innerHTML="On";

  }

  if(!garage.lightOn){
    document.getElementById("light-status").innerHTML="Off";
  }

  if(garage.autoCloseEnabled){
    document.getElementById("autoClose_button").value="Turn Off";
  }

  if(!garage.autoCloseEnabled){
    document.getElementById("autoClose_button").value="Turn On";
  }





}

var autocloseSlider
var brightnessSlider
var autoOffSlider

function autocloseSlidebarChange(event) {
  autocloseTime.innerText = autocloseSlider.value + " s"
  garage.setAutoCloseTime(autocloseSlider.value);
}

function brightnessSlidebarChange(event) {
  brightness.innerText = brightnessSlider.value + "%";
  garage.setBrightness(brightnessSlider.value);
}

function autoOffSlidebarChange(event) {
  autoOffTime.innerText = autoOffSlider.value + " s"
  garage.setAutoOffTime(autoOffSlider.value);
}


//get initial state, hide until variables loaded
function loadingPage(){

  garage.setup();
  //var promise = new Promise(garage.setup();
  //alert(garage.setUp);
  //if(garage.setUp){
  garage.stateChange();
  document.getElementById('login-screen').hidden = true;
}


document.addEventListener("DOMContentLoaded", function(event){
  //on load
  console.log("Document Loaded");
  document.getElementById('status-screen').hidden = true;
  document.getElementById('login-screen').hidden = false;
  document.getElementById('account-creation').hidden = true;
  document.getElementById('advanced-settings-screen').hidden = true;
  autocloseSlider = document.getElementById("autocloseSlider");
  brightnessSlider = document.getElementById('brightnessSlider');
  autoOffSlider = document.getElementById('autoOffSlider');
  garage.streamState();
  // garage.setup();

  // Event handlers
  document.getElementById("autocloseSlider").addEventListener("change", autocloseSlidebarChange)
  document.getElementById("brightnessSlider").addEventListener("change", brightnessSlidebarChange)
  document.getElementById("autoOffSlider").addEventListener("change", autoOffSlidebarChange)

  // document.getElementById("open_garage").addEventListener("click", garage.changeGarage);

})
