import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { placeStore } from "./Store";
import "../styles/Map.css";
function Map() {
  const places = placeStore.useState((s) => s.places);
  const geoedPlaces = placeStore.useState((s) => s.geoedPlaces);
  const search = placeStore.useState((s) => s.search);

  //googlemap setup
  const containerStyle = {
    width: "85%",
    height: "400px",
  };

  const center = {
    lat: 43.453,
    lng: -79.583,
  };

  const zoom = 9;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgxJ-padRN_a3sczwqk7sB1NPkuObA2gk",
  });

  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  //conditional rendering

  return (
    <div className="map">
      <h1>Map</h1>
      {isLoaded && places ? (
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* loop through places, for each coordinate of a place, set a marker for it */}

          {geoedPlaces
            .filter(
              (place) =>
                place.name.toLowerCase().includes(search.toLowerCase()) ||
                place.address.toLowerCase().includes(search.toLowerCase())
            )
            .map((place) => (
              <Marker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                onClick={() => {
                  setSelectedPlace(place);
                }}
              />
            ))}
          {selectedPlace && (
            <InfoWindow
              position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              onCloseClick={() => {
                setSelectedPlace(null);
              }}
            >
              <div>
                <h3>
                  {selectedPlace.name}({selectedPlace.id})
                </h3>
                <p>{selectedPlace.address}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Map;
