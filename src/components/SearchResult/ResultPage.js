import { useEffect, useState, useContext } from "react";
import CardItem from "./CardItem";
import firebase from "firebase";
import firebaseContext from "../Firebase/context";

const ResultPage = () => {
  const [properties, setProperties] = useState([]);
  const db = firebase.firestore();
  const fbContext = useContext(firebaseContext);

  const propertyList = async () => {
    const response = db.collection("Property");
    const data = [];
    const items = await response.get();
    items.forEach((doc) => {
      data.push(doc.data());
    });
    setProperties(data);
  };

  useEffect(() => {
    fbContext.auth.onAuthStateChanged((data) => {
      propertyList(data.uid);
    });
  }, []);

  return (
    <div className="flex flex-wrap overflow-hidden">
      {properties &&
        properties.map((property) => (
          <div
            key={property.name}
            className="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/4"
          >
            <CardItem
              image={property.thumb}
              name={property.name}
              city={property.city}
              price={property.price}
              bathroom={property.bathroom}
              room={property.room}
              traveler={property.traveler}
              surface={property.surface}
            />
          </div>
        ))}
    </div>
  );
};

export default ResultPage;
