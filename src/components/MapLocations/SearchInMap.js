import "../../App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CardPropertyIcons from "../SearchResult/CardItem/CardPropertyIcons";
import CardPriceButton from "../SearchResult/CardItem/CardPriceButton";
import { BiMap } from "react-icons/bi";

export default function SearchInMap(props) {
  return (
    <>
      <MapContainer center={[45.855371, 6.6853104]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.propertyList &&
          props.propertyList.map(
            (property) =>
              property.position && (
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
                      <CardPriceButton
                        price={property.price}
                        idproperty={property.objectID}
                      />
                    </div>
                  </Popup>
                </Marker>
              )
          )}
      </MapContainer>
    </>
  );
}
