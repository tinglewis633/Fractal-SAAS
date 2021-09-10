import React, { useEffect } from "react";
import axios from "axios";
import { placeStore } from "./Store";
import "../styles/App.css";

//bring in components
import PlaceList from "./PlaceList";
import SearchBar from "./SearchBar";
import Map from "./Map";

function App() {
  const places = placeStore.useState((s) => s.places);

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

  //use geo api to add lat lng to places data and set it to a new state called GeoedPlaces
  if (places) {
    const dummyGeoPlaces = [];
    let adjustNum = 0.001;
    places.map((place) =>
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: place.address,
            key: "AIzaSyBgxJ-padRN_a3sczwqk7sB1NPkuObA2gk",
          },
        })
        .then((response) => {
          //adjusting the coor if they have exact same address
          adjustNum = adjustNum + 0.001;

          const newPlace = Object.assign(
            {
              lat: response.data.results[0].geometry.location.lat + adjustNum,
              lng: response.data.results[0].geometry.location.lng,
            },
            place
          );
          dummyGeoPlaces.push(newPlace);
          placeStore.update((s) => {
            s.geoedPlaces = [...dummyGeoPlaces];
          });
          return;
        })
    );
  }

  //conditional rendering
  if (!places) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="main">
        <SearchBar />
        <PlaceList />
        <Map></Map>
      </div>
    );
  }
}

export default App;
