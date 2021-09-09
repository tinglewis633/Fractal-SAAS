import { Store } from "pullstate";

export const placeStore = new Store({
  places: [],
  search: "",
  geoedPlaces: [],
});
