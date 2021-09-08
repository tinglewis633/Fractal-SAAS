import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

//googlemap setup
const containerStyle = {
  width: "85%",
  height: "400px",
};
const center = {
  lat: 43.6532,
  lng: -79.583,
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgxJ-padRN_a3sczwqk7sB1NPkuObA2gk",
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {
        props.places.map((place) => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            label={{
              text: place.id,
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          />
        ))
      
      }
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
