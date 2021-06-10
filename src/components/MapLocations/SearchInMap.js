import "../../App.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CardPropertyIcons from "../SearchResult/CardItem/CardPropertyIcons";
import CardPriceButton from "../SearchResult/CardItem/CardPriceButton";
import { BiMap } from "react-icons/bi";

export default function SearchInMap() {
  const [propertyPositions, setPropertyPositions] = useState([]);
  const [propertyList, setpropertyList] = useState([]);
  const db = firebase.firestore();
  const positions = [];
  useEffect(() => {
    db.collection("Property")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setpropertyList(data);
        querySnapshot.docs.map((doc) => {
          setPropertyPositions([
            [doc.data().position.latitude, doc.data().position.longitude],
          ]);
        });
      });
  }, []);

  /*const getLatLngBounds = () => {
    const latLngs = propertyPositions.map((position) => {
      console.log(propertyPositions);
      return L.latLng(position[0], position[1]);
    });
    const bounds = L.latLngBounds(latLngs);
    console.log(bounds);
    return bounds;
  };

  getLatLngBounds();*/

  return (
    <>
      {propertyPositions && (
        <MapContainer center={[45.855371, 6.6853104]} zoom={13}>
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
                  <p className="flex items-center gold-color -mt-2 uppercase text-xs font-semibold tracking-wider">
                    <span className="text-black pr-0.5">
                      <BiMap />
                    </span>
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
      )}
    </>
  );
}
