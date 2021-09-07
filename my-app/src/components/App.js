import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceList from "./PlaceList";
import "../styles/App.css";

function App() {
  const [places, setPlaces] = useState({});
  const [search, setSearch] = useState("");

  const Search = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    const result = places.places.filter(
      (place) =>
        place.name.toLowerCase().includes(search.toLowerCase()) ||
        place.address.toLowerCase().includes(search.toLowerCase())
    );
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
          onChange={Search}
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
      </div>
    );
  }
}

export default App;
