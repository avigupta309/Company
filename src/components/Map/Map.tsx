import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
  const [coordinates, setCoordinates] = useState<LocationProps | null>();
  const { commonName } = useParams<{ commonName: string }>();
  // console.log(commonName);

  useEffect(() => {
    if (commonName) {
      fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${commonName}`
      ).then((response) => {
        response.json().then((data) => {
          // console.log(data);
          setCoordinates(data.coordinates);
        });
      });
    }
  }, [commonName]);
  if (!coordinates) {
    return (
      <div className="h-full w-full bg-white">
        <img
          className=""
          src="https://media.tenor.com/fnVo42SgddYAAAAM/dog.gif"
        />
      </div>
    );
  }
  // console.log(coordinates?.lat + "   " + coordinates?.lon);
  return (
    <div className="h-full w-full">
      <div className="container" style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[coordinates.lat, coordinates.lon]}
          zoom={7}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coordinates.lat, coordinates.lon]}>
            <Popup>
              Welcome to {commonName} ,Jaana Hai Ki sirf Dekhna hi hai{" "}
            </Popup>
          </Marker>
          <UpdateMapView center={[coordinates.lat, coordinates.lon]} />
        </MapContainer>
      </div>
    </div>
  );
};
