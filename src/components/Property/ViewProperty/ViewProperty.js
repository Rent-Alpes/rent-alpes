import { useState, useEffect } from "react";
import app from "firebase/app";
import Header from "../../Header/Header";
import Slider from "./Slider";

const ViewProperty = () => {
  const db = app.firestore();
  const [propertyData, setpropertyData] = useState(null);
  const [files, setFiles] = useState(null);
  const propertyId = window.location.href.split("/")[4];
  const storageRef = app.storage().ref();

  function getImages() {
    var docRef = db.collection("Property").doc(propertyId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setpropertyData(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    const fetchImages = async () => {
      let result = await storageRef
        .child("image/property/" + propertyId)
        .listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );
      return Promise.all(urlPromises);
    };
    const loadImages = async () => {
      let urlList = [];
      const urls = await fetchImages();
      console.log(urls);
      urls.forEach((link) => {
        console.log(link);
        urlList.push({ url: link });
      });
      setFiles(urlList);
    };
    loadImages();
  }
  useEffect(() => {
    getImages();
  }, []);
  console.log(files);
  return (
    <>
      <Header />
      <div className="text-center">
        <div className="inline-block">
          <div>
            <h1 className="mt-10 text-5xl">
              {propertyData && propertyData.name}
            </h1>
          </div>
          <div>{files && <Slider images={files} />}</div>
        </div>
      </div>
    </>
  );
};

export default ViewProperty;
