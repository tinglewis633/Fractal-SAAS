import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceList from "./PlaceList";
import Map from "./Map";

import "../styles/App.css";

function App() {
  //useState
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");

  //targeting user input and set it to state
  const searchPlace = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  //fetching data
  useEffect(() => {
    axios
      .get("https://610bb7502b6add0017cb3a35.mockapi.io/api/v1/places")
      .then((data) => {
        setPlaces((prev) => ({
          ...prev,
          places: data.data,
        }));
      });
  }, []);

  //conditional rendering
  if (!places.places) {
    return <h1>Loading...</h1>;
  } else {
    places.places.map((place) =>
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: place.address,
            key: "AIzaSyBgxJ-padRN_a3sczwqk7sB1NPkuObA2gk",
          },
        })
        .then((response) => {
          place.lat = response.data.results[0].geometry.location.lat;
          place.lng = response.data.results[0].geometry.location.lng;
        })
    );
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

          {places.places
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
        <Map places={places.places}></Map>
      </div>
    );
  }
}

export default App;
