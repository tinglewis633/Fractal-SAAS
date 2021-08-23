import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./place.css";
function Place() {
  const [place, setPlace] = useState({});
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    axios
      .get("https://610bb7502b6add0017cb3a35.mockapi.io/api/v1/places")
      .then((data) => {
        setPlace((prev) => ({
          ...prev,
          place: data.data.filter((place) => place.id === id),
        }));
      });
  }, []);

  if (place.place === undefined) {
    return <h1>loading...</h1>;
  } else {
    const { hours, name, website_url, address, logo_url } = place.place[0];
    const hoursArr = [];
    for (const day in hours) {
      hoursArr.push(day + hours[day]);
    }

    console.log(hoursArr);
    return (
      <div className="place">
        <img src={logo_url} alt="image resource not found"></img>
        <ul>
          <li>Busniess Name: {name} </li>
          <li>Address: {address} </li>
          <li>Website: {website_url} </li>
          <li>
            Hours:
            {hoursArr.map((hour) => (
              <p>{hour}</p>
            ))}
          </li>
        </ul>
      </div>
    );
  }
}

export default Place;
