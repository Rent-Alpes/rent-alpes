import "../../App.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CardPropertyIcons from "../SearchResult/CardItem/CardPropertyIcons";
import CardPriceButton from "../SearchResult/CardItem/CardPriceButton";

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
    console.log(propertyList);
  }, []);

  return (
    <>
      <MapContainer center={[45.8396606, 6.5890413]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {propertyList &&
          propertyList.map((property) => (
            <Marker
              key={property.position.latitude}
              position={[
                property.position.latitude,
                property.position.longitude,
              ]}
            >
              <Popup className="request-popup">
                <img
                  src={property.thumb}
                  width="400"
                  height="200"
                  alt="no img"
                />
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {property.name}
                </p>
                <p className="gold-color -mt-2 uppercase text-xs font-semibold tracking-wider">
                  {property.city}
                </p>
                <div className="flex items-center justify-between">
                  <CardPropertyIcons
                    bathroom={property.bathroom}
                    room={property.bathroom}
                    traveler={property.traveler}
                  />
                  <CardPriceButton price={property.price} />
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
}
