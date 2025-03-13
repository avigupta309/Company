import React, { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ContextApi } from "../ContextApi/ContextApi";
interface locationProps {
  lat: number;
  lon: number;
}

interface centerProps {
  center: [number, number];
}

function UpdateMapView({ center }: centerProps) {
  const Map = useMap();
  Map.setView(center, Map.getZoom());
  return null;
}

export const Map: React.FC = () => {
  const receiveData = useContext(ContextApi);
  const [latLng, setLatLng] = useState<locationProps>({
    lat: 27.0167,
    lon: 84.8667,
  });
  useEffect(() => {
    console.log("ok");
    if (receiveData?.location) {
      setLatLng({
        lat: receiveData.location.lat,
        lon: receiveData.location.lon,
      });
    }
  }, [receiveData?.location]);

  if (!receiveData?.location && receiveData?.location == undefined) {
    return;
  }

  return (
    <div className="h-full w-full">
      <div className="container h-[60%] w-full">
        <MapContainer
          center={[latLng.lat, latLng.lon]}
          zoom={7}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[latLng.lat, latLng.lon]}>
            <Popup>Welcome In this City</Popup>
          </Marker>
          <UpdateMapView center={[latLng.lat, latLng.lon]} />
        </MapContainer>


     
      </div>
    </div>
  );
};

