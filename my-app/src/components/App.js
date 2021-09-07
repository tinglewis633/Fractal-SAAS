import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceList from "./PlaceList";
import "../styles/App.css";

function App() {
  const [places, setPlaces] = useState({});

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
        <table>
          <tbody>
            <tr>
              <th>Business ID</th>
              <th>Business Name</th>
              <th>Website</th>
              <th>Address</th>
            </tr>
          </tbody>
          {places.places.map((place) => (
            <PlaceList key={place.id} place={place} />
          ))}
        </table>
      </div>
    );
  }
}

export default App;
