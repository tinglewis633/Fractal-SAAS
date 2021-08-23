import React from "react";
import "./PlaceList.css";

function PlaceList(props) {
  const { id, name, website_url, address } = props.place;
  return (
    <tbody>
      <tr>
        <td>{id}</td>
        <td>
          <a href={`places/` + id}>{name}</a>
        </td>
        <td>{website_url}</td>
        <td>{address}</td>
      </tr>
    </tbody>
  );
}

export default PlaceList;
