import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
//import { Link } from "react-router-dom";

const containerStyle = {
  width: "500px",
  height: "500px",
};
//31.459124178383725, 74.27579148911076
const center = {
  lat: 31.459,
  lng: 74.275,
};

export default function PassengerDashboard() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAYrSOrJ9zAJkh1V58XjUw8nLVq4LjLnmM",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Passenger Dashboard
        </h1>
      </div>
      <div className="p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <></>
        </GoogleMap>
        <></>
      </div>
    </div>
  );
}
