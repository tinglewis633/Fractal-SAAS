import React, { useEffect } from "react";
import "../styles/PlaceList.css";
import { placeStore } from "./Store";
function PlaceList() {
  const places = placeStore.useState((s) => s.places);
  const search = placeStore.useState((s) => s.search);

  return (
    <table>
      <tbody>
        <tr>
          <th>Business ID</th>
          <th>Business Name</th>
          <th>Website</th>
          <th>Address</th>
        </tr>
      </tbody>
      <tbody>
        {places
          .filter(
            (place) =>
              place.name.toLowerCase().includes(search.toLowerCase()) ||
              place.address.toLowerCase().includes(search.toLowerCase())
          )
          .map((place) => (
            <tr key={place.id}>
              <td>{place.id}</td>
              <td>
                <a href={`places/` + place.id}>{place.name}</a>
              </td>
              <td>{place.website_url}</td>
              <td>{place.address}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default PlaceList;

/*
            <tbody> 
        <tr>
        <td>{id}</td>
        <td>
          <a href={`places/` + id}>{name}</a>
        </td>
        <td>{website_url}</td>
        <td>{address}</td>
      </tr>
        </tbody> */
