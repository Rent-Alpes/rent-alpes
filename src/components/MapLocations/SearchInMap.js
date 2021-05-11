import "../../App.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

export default function SearchInMap() {
  const [propertyList, setpropertyList] = useState([]);
  const [activeProperty, setActiveProperty] = useState(null);
  const db = firebase.firestore();
  useEffect(() => {
    db.collection("Property")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setpropertyList(data);
      });
  }, []);

  return (
    <>
      <MapContainer center={[45.74868392944336, 6.292667388916016]} zoom={17}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {propertyList &&
          propertyList.map((property) => {
            console.log(property);
            return (
              property.Longitude && (
                <Marker
                  key={property.id}
                  position={[property.Latitude, property.Longitude]}
                />
              )
            );
          })}
      </MapContainer>
    </>
  );
}
