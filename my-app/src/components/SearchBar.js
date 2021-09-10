import React from "react";

import { placeStore } from "./Store";
function SearchBar() {
  const searchPlace = (e) => {
    placeStore.update((s) => {
      s.search = e.target.value;
    });
  };

  return (
    <input
      className="searchbar"
      type="text"
      placeholder="Search place name or address"
      onChange={searchPlace}
    ></input>
  );
}

export default SearchBar;

