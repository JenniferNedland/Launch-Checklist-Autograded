// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    
    document.getElementById("missionTarget").innerHTML = `
    <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">`;
 }
 
 function validateInput(testInput) {
     if (!testInput) {
         return "Empty";
     }
     if (isNaN(testInput)) {
         return "Not a Number";
     }
     return "Is a Number";
}
 
function getErrorMessages(testInput, canHasString, description) {
    let result = validateInput(testInput);

    if (result == "Empty") {
      return [`${description} cannot be blank.`];
    }
    if (canHasString && result == "Is a Number") {
      return [`${description} cannot be a number.`];
    }
    if (!canHasString && result == "Not a Number") {
      return [`${description} must be a number.`];              
    }
    return [];
} 
 
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const errors = [
      ...getErrorMessages(pilot, true, "Pilot name"),
      ...getErrorMessages(copilot, true, "Copilot name"),
      ...getErrorMessages(fuelLevel, false, "Fuel level"),
      ...getErrorMessages(cargoLevel, false, "Cargo mass")
    ];
    if (errors.length > 0) {
        try {
            alert(errors.join("\n"));
        } catch (e) {
        }

    }
    const fuelReady = fuelLevel >= 10000;
    const cargoReady = cargoLevel <= 10000;
    
    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
    document.getElementById("fuelStatus").innerHTML = `Fuel level ${fuelReady ?  "high enough" : "too low"} for launch`;
    document.getElementById("cargoStatus").innerHTML = `Cargo mass ${cargoReady ? "low enough" : "too heavy"} for launch`;
    
    if (!fuelReady || !cargoReady) {
        
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "red";
    } else {
        document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style.color = "green";
    }
    document.getElementById("faultyItems").style.visibility = "visible";
 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
         .then(function (response) {
             return response.json();
          });
 
     return planetsReturned;
 }
 
function pickPlanet(planets) {
     return planets[Math.floor(Math.random() * planets.length)];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;