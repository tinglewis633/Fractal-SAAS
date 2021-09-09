import React, { useEffect } from "react";
import axios from "axios";
import PlaceList from "./PlaceList";
import Map from "./Map";

import { placeStore } from "./Store";

import "../styles/App.css";
const arr = [];
function App() {
  //bring in places and search state
  const search = placeStore.useState((s) => s.search);
  const places = placeStore.useState((s) => s.places);
  //targeting user input and set it to state
  const searchPlace = (e) => {
    placeStore.update((s) => {
      s.search = e.target.value;
    });
  };

  useEffect(() => {
    //fetching data
    axios
      .get("https://610bb7502b6add0017cb3a35.mockapi.io/api/v1/places")
      .then((data) => {
        placeStore.update((s) => {
          s.places = data.data;
        });
      });
  }, []);

  // places.map((place) =>
  //   axios
  //     .get("https://maps.googleapis.com/maps/api/geocode/json", {
  //       params: {
  //         address: place.address,
  //         key: "AIzaSyBgxJ-padRN_a3sczwqk7sB1NPkuObA2gk",
  //       },
  //     })
  //     .then((response) => {
  //       return [
  //         response.data.results[0].geometry.location.lat,
  //         response.data.results[0].geometry.location.lng,
  //       ];
  //     })
  // );

  //conditional rendering
  if (!places) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="table">
        <input
          className="searchbar"
          type="text"
          placeholder="Search place name or address"
          onChange={searchPlace}
        ></input>
        <table>
          <tbody>
            <tr>
              <th>Business ID</th>
              <th>Business Name</th>
              <th>Website</th>
              <th>Address</th>
            </tr>
          </tbody>

          {places
            // filter from what is in the search bar input
            .filter(
              (place) =>
                place.name.toLowerCase().includes(search.toLowerCase()) ||
                place.address.toLowerCase().includes(search.toLowerCase())
            )
            .map((place) => (
              <PlaceList key={place.id} place={place} />
            ))}
        </table>

        <h1>Map</h1>
        <Map places={places}></Map>
      </div>
    );
  }
}

export default App;
