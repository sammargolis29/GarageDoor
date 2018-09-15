


// TODO: Add the access token and device ID
var myParticleAccessToken = "31a4eb7f9635dd8fea3a6ff5ad63caaa5bead504"
var myDeviceId =            "3a0043001051363036373538"
var topic =                 "cse222Garage/thisGarage/garage"

// // Setup variables to access commonly used DOM elements
// function wait(timeInSeconds) {
//   var start = Date.now();
//   var endTime = start + timeInSeconds*1000;
//   while(Date.now()<endTime);
// }

var garage = {
  // state variables for simulated lamp
  open: true, //garage initialized as open
  closed:false,
  opening:false,
  closing:false,
  faultO: false,
  faultC: false,
  stopO: false,
  stopC: false,
  lightOn: true,
  autoCloseEnabled: false,
  autoCloseTime: 0,
  lightBrightness: 0,
  lightAutoEnabled: false,
  lightTime: 0,
  stateChangeHandler: null,
  particle: null,
  setUp: false,

  // getState: Get the initial state and eventually pass it to the "callback" function
  getState: function(callback) {
    var state = { "open":this.open,
    "opening":this.opening,
    "closed":this.closed,
    "closing":this.closing,
    "lightOn":this.lightOn,
    "autoCloseEnabled":this.autoCloseEnabled,
    "autoCloseTime":this.autoCloseTime,
    "lightBrightness":this.lightBrightness,
    "lightAutoEnabled":this.lightAutoEnabled,
    "lightTime":this.lightTime};


    //setTimeout(function () {setStateChangeHandler(state)},  1000);
  },


  // ****** Simple setter functions *******
  changeGarage:function() {
    //sent that vtog was hit
    var functionData = {
      deviceId:myDeviceId,
      //  name: "setGarOpen",
      name: "TogDoor",
      argument: "Hit",
      auth: myParticleAccessToken
    }
    document.getElementById("open_garage").hidden=true;
    // Include functions to provide details about the process.
    function onSuccess(e) { console.log("TogDoor call success")
    document.getElementById("open_garage").hidden=false;
    if(this.open){
      this.closing=true;
      this.opening=false;
      this.open=false;
      this.closed=false;
      this.faultO= false;
      this.faultC= false;
      this.stopO= false;
      this.stopC= false;
      this.lightOn = true;
      console.log("closing")
      garage.stateChange();
      // wait(1);
      // this.setGarageClosed();
      //setTimeout(function () {garage.setGarageClosed() },  1000);
    }
    else{
      this.opening=true;
      this.closing=false;
      this.open=false;
      this.closed=false;
      this.faultO= false;
      this.faultC= false;
      this.stopO= false;
      this.stopC= false;
      this.lightOn = true;
      console.log("opening")
      garage.stateChange();
      //setTimeout(function () {garage.setGarageOpen() },  1000);
    }
  }

  function onFailure(e) { console.log("TogDoor failed")
  document.getElementById("open_garage").hidden=false;
  console.dir(e) }
  particle.callFunction(functionData).then(onSuccess,onFailure)
},


setGarageOpen: function() {
  this.open=true;
  this.opening=false;
  this.closed=false;
  this.closing=false;
  this.faultO= false;
  this.faultC= false;
  this.stopO= false;
  this.stopC= false;
  this.lightOn = false;
  console.log("open");
  this.stateChange();
},
setGarageClosed: function() {
  this.closed=true;
  this.open=false;
  this.opening=false;
  this.closing=false;
  this.faultO= false;
  this.faultC= false;
  this.stopO= false;
  this.stopC= false;
  this.lightOn = false;
  console.log("Closed");
  this.stateChange();
},
changeLight: function() {
  if(this.lightOn){
    garage.turnLightOff();
  }
  else{
    garage.turnLightOn();
  }
},
turnLightOn: function() {
  this.lightOn = true;
  console.log("Light On");
  var functionData = {
    deviceId:myDeviceId,
    //  name: "setGarOpen",
    name: "togLight",
    argument: "On",
    auth: myParticleAccessToken
  }
  // Include functions to provide details about the process.
  function onSuccess(e) { console.log("togLight call success")}
  function onFailure(e) { console.log("togLight failed")
  console.dir(e) }
  particle.callFunction(functionData).then(onSuccess,onFailure);
  this.stateChange();




},
turnLightOff: function() {
  this.lightOn = false;
  console.log("Light Off");
  var functionData = {
    deviceId:myDeviceId,
    //  name: "setGarOpen",
    name: "togLight",
    argument: "Off",
    auth: myParticleAccessToken
  }
  // Include functions to provide details about the process.
  function onSuccess(e) { console.log("togLight call success")}


  function onFailure(e) { console.log("togLight failed")
  console.dir(e) }
  particle.callFunction(functionData).then(onSuccess,onFailure);

  this.stateChange();
},

changeAutoClose: function(){
  if(this.autoCloseEnabled){
    this.autoCloseEnabled=false;
    var functionData = {
      deviceId:myDeviceId,
      //  name: "setGarOpen",
      name: "autoClose",
      argument: "f" + this.autoCloseTime,
      auth: myParticleAccessToken
    }
    // Include functions to provide details about the process.
    function onSuccess(e) { console.log("autoClose call success") }
    function onFailure(e) { console.log("autoClose failed")
    console.dir(e) }
    particle.callFunction(functionData).then(onSuccess,onFailure)
    console.log(this.autoCloseEnabled);
    this.stateChange();
  }
  else{
    this.autoCloseEnabled=true;
    var functionData = {
      deviceId:myDeviceId,
      //  name: "setGarOpen",
      name: "autoClose",
      argument: "t" + this.autoCloseTime,
      auth: myParticleAccessToken
    }
    // Include functions to provide details about the process.
    function onSuccess(e) { console.log("autoClose call success") }
    function onFailure(e) { console.log("autoClose failed")
    console.dir(e) }
    particle.callFunction(functionData).then(onSuccess,onFailure)


    console.log(this.autoCloseEnabled);
    this.stateChange();
  }
},
setAutoCloseTime: function(time){
  this.autoCloseTime= time;
  var functionData = {
    deviceId:myDeviceId,
    //  name: "setGarOpen",
    name: "autoClose",
    argument: "g" + this.autoCloseTime,
    auth: myParticleAccessToken
  }
  // Include functions to provide details about the process.
  function onSuccess(e) { console.log("autoClose call success") }
  function onFailure(e) { console.log("autoClose failed")
  console.dir(e) }
  particle.callFunction(functionData).then(onSuccess,onFailure)
  console.log(this.autoCloseTime);
  this.stateChange();
},

setAutoOffTime: function(time){
  this.lightTime= time;
  var functionData = {
    deviceId:myDeviceId,
    //  name: "setGarOpen",
    name: "autoOffTime",
    argument: "" + this.lightTime,
    auth: myParticleAccessToken
  }
  // Include functions to provide details about the process.
  function onSuccess(e) { console.log("autoOff call success")
  }
  function onFailure(e) { console.log("autoClose failed")
  console.dir(e) }
  particle.callFunction(functionData).then(onSuccess,onFailure)
  this.stateChange();
},



setBrightness: function(brightness){
  this.lightBrightness= brightness;

  var functionData = {
    deviceId:myDeviceId,
    //  name: "setGarOpen",
    name: "setBright",
    argument: "" + this.lightBrightness,
    auth: myParticleAccessToken
  }
  // Include functions to provide details about the process.
  function onSuccess(e) { console.log("autoOff call success") }
  function onFailure(e) { console.log("autoClose failed")
  console.dir(e) }
  particle.callFunction(functionData).then(onSuccess,onFailure)

  this.stateChange();
},
// changeLight: function(){
//   if(this.lightOn){
//     this.lightOn=false;
//     this.stateChange();
//   }
//   else if(!this.lightOn){
//     this.lightOn=true;
//     this.stateChange();
//   }
// },
changeAutoLight: function(){
  if(this.lightAutoEnabled){
    this.lightAutoEnabled=false;
    this.stateChange();
  }
  else if(!this.lightAutoEnabled){
    this.lightAutoEnabled=true;
    this.stateChange();
  }
},
setLightTime: function(time){
  this.lightTime=time;
  this.stateChange();
},
setStateChangeHandler: function(handler) {
  this.stateChangeHandler = handler;
  this.stateChange();
},
stateChange: function() {


    var newState = { open: this.open, //garage initialized as open
      opening:this.opening,
      closed:this.closed,
      closing:this.closing,
      lightOn: this.lightOn,
      autoCloseEnabled: this.autoCloseEnabled,
      autoCloseTime: this.autoCloseTime,
      lightBrightness: this.lightBrightness,
      lightAutoEnabled: this.lightAutoEnabled,
      lightTime: this.lightTime
    };
    console.log(newState);
    logStateChange();



  // NOTE: Consider using the JSON format shown in getState()
  // Whenever this is called it should pass the current state to the callback function after 1s

  // This will create a JSON style object.

  //setTimeout(function () {setStateChangeHandler(newState)},  1000);
},
streamState: function() {

  var newState;
  //Get your devices events
  particle.getEventStream({ deviceId: myDeviceId, auth: myParticleAccessToken }).then(function(stream) {
    stream.on('event', function(data) {
      // console.log("Data Here!");
      // console.log(data.data);
      // newState = data.data;
      var obj = JSON.parse(data.data);
      garage.autoCloseTime=(obj.autoTi/1000);
      garage.autoCloseEnabled=obj.autoEn;
      // garage.lightOn=obj.lightStatus;
      // console.log(obj.lightStatus);
      newState = obj.state;

      switch(newState) {
        case 0:
        // OPEN
        garage.open=true;
        garage.opening=false;
        garage.closed=false;
        garage.closing=false;
        garage.faultO= false;
        garage.faultC= false;
        garage.stopO= false;
        garage.stopC= false;
        break;
        case 1:
        // CLOSING
        garage.open=false;
        garage.opening=false;
        garage.closed=false;
        garage.closing=true;
        garage.faultO= false;
        garage.faultC= false;
        garage.stopO= false;
        garage.stopC= false;
        break;
        case 2:
        // CLOSED
        //alert("got here");
        garage.open=false;
        garage.opening=false;
        garage.closed=true;
        garage.closing=false;
        garage.faultO= false;
        garage.faultC= false;
        garage.stopO= false;
        garage.stopC= false;
        break;
        case 3:
        // OPENING
        garage.open=false;
        garage.opening=true;
        garage.closed=false;
        garage.closing=false;
        garage.faultO= false;
        garage.faultC= false;
        garage.stopO= false;
        garage.stopC= false;
        break;
        case 4:
        // STOP CLOSING
        garage.open=false;
        garage.opening=false;
        garage.closed=false;
        garage.closing=false;
        garage.faultO= false;
        garage.faultC= false;
        garage.stopO= false;
        garage.stopC= true;
        break;
        case 5:
        // STOP OPENING
        garage.open=false;
        garage.opening=false;
        garage.closed=false;
        garage.closing=false;
        garage.faultO= false;
        garage.faultC= false;
        garage.stopO= true;
        garage.stopC= false;
        break;
        case 6:
        // FALUT CLOSING
        garage.open=false;
        garage.opening=false;
        garage.closed=false;
        garage.closing=false;
        garage.faultO= false;
        garage.faultC= true;
        garage.stopO= false;
        garage.stopC= false;
        break;
        case 7:
        // FAULT OPENING
        garage.open=false;
        garage.opening=false;
        garage.closed=false;
        garage.closing=false;
        garage.faultO= true;
        garage.faultC= false;
        garage.stopO= false;
        garage.stopC= false;
        break;
        default:

      }

      console.log(obj.lightStatus);
      if(obj.lightStatus==1){
        garage.lightOn=true;
      }else{
        garage.lightOn=false;
      }
      garage.stateChange();
    });
  });


},
setup: function() {
  // Create a particle object
  particle = new Particle();

  var functionData = {
    deviceId:myDeviceId,
    //  name: "setGarOpen",
    name: "publish",
    argument: "pub",
    auth: myParticleAccessToken
  }
  // Include functions to provide details about the process.
  function onSuccess(e) {
    console.log("publish call success");
    load_settings();
    setAutoOffTime();
  }
  function onFailure(e) { console.log("publish failed")
  console.dir(e) }
  particle.callFunction(functionData).then(onSuccess,onFailure)

  // Get ready to subscribe to the event stream
  // function onSuccess(stream) {
  //   alert("whaddup");
  //   // DONE:  This will "subscribe' to the stream and get the state"
  //   console.log("getEventStream success")
  //   //stream.on('event', newLightEvent)

  // NOTE: This is here in the callback to the subscribe --- it will request the state
  //       once successbully subscribed.
  // }
  function onFailure(e) { console.log("getEventStream call failed")
  console.dir(e) }
  // Subscribe to the stream
  garage.stateChange();
  //  particle.getEventStream( { name: topic, auth: myParticleAccessToken }).then(onSuccess, onFailure)}
},
}
