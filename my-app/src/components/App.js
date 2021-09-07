import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceList from "./PlaceList";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import "../styles/App.css";

function App() {
  const [places, setPlaces] = useState({});
  const [search, setSearch] = useState("");
  function Map() {
    //convert address to lat and lng and set it to data using geo api

    places.places.map((place) => {
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
        });
    });

    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
      >
        {
      
          places.places.map((place) => {
             <Marker position={{ lat: place.lat, lng: place.lng }} />;
          })
        }
        <Marker position={{ lat: 43.6532, lng: -79.3832 }} />;
      </GoogleMap>
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));

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
  if (!places.places) {
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

        <div className="map">
          <WrappedMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBgxJ-padRN_a3sczwqk7sB1NPkuObA2gk"
            loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
            containerElement={
              <div id="map" style={{ height: `350px`, width: `90%` }} />
            }
            mapElement={<div style={{ height: `100%`, width: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
