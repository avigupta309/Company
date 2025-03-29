import React, { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ContextApi } from "../ContextApi/ContextApi";
import { useParams } from "react-router-dom";

interface LocationProps {
  lat: number;
  lon: number;
}

interface CenterProps {
  center: [number, number];
}

function UpdateMapView({ center }: CenterProps) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export const Map: React.FC = () => {
  const receiveData = useContext(ContextApi);
  const [latLng, setLatLng] = useState<LocationProps | null>(null);
  const {commonName}=useParams<{commonName:string}>()
  useEffect(() => {
    if (receiveData?.location) {
      setLatLng({
        lat: receiveData.location.lat,
        lon: receiveData.location.lon,
      });
      const newLocation= {
        lat: receiveData.location.lat,
        lon: receiveData.location.lon,
      };
      localStorage.setItem("locationData", JSON.stringify(newLocation));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveData?.location]);

  useEffect(() => {
    const storedLocation = localStorage.getItem("locationData");
    if (storedLocation) {
      setLatLng(JSON.parse(storedLocation));
    }
  }, []);

  if (!latLng) {
    return <p>Loading map...</p>;
  }

  return (
    <div className="h-full w-full">
      <div className="container" style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[latLng.lat, latLng.lon]}
          zoom={7}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[latLng.lat, latLng.lon]}>
            <Popup>Welcome to  {commonName} ,Jaana Hai Ki sirf Dekhna hi hai </Popup>
          </Marker>
          <UpdateMapView center={[latLng.lat, latLng.lon]} />
        </MapContainer>
      </div>
    </div>
  );
};
