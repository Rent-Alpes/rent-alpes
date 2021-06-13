import "../../App.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function SearchInMap({ position }) {
  console.log(position);
  return (
    <>
      <MapContainer
        center={[position._lat, position._long]}
        scrollWheelZoom={false}
        zoom={13}
        className="map-view-property"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker
            key={position._lat}
            position={[position._lat, position._long]}
          ></Marker>
        )}
      </MapContainer>
    </>
  );
}
