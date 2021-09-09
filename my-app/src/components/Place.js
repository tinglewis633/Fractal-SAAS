import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Place.css";
import { placeStore } from "./Store";
function Place() {
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

  //require the id coming from the URL
  const params = useParams();
  const id = params.id;

  //conditional rendering
  if (places.length === 0) {
    return <h1>loading...</h1>;
  } else {
    console.log(places.filter((place) => place.id === id));
    const { hours, name, website_url, address, logo_url } = places.filter(
      (place) => place.id === id
    )[0];
    const hoursArr = [];

    //reformat the hours data
    for (const day in hours) {
      hoursArr.push(day + ":  " + hours[day]);
    }
    return (
      <div className="header">
        <a href="/">Back to Place List</a>
        <div className="place">
          <img
            src={logo_url}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/noimage.png";
            }}
            alt="resource not found"
          />
          <ul>
            <li>Busniess Name: {name} </li>
            <li>Address: {address} </li>
            <li>Website: {website_url} </li>
            <li>
              Hours:
              {hoursArr.map((hour) => (
                <p key={hour.slice(0, 3)}>{hour}</p>
              ))}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Place;
