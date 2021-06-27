import { useState, useEffect, useContext } from "react";
import app from "firebase/app";
import HeaderDark from "../../HeaderDark/HeaderDark";
import Slider from "./Slider";
import ModalReservation from "../ViewProperty/ModalReservation";
import { BiMap, BiGroup, BiLockAlt } from "react-icons/bi";
import ViewPropertyIcons from "./ViewPropertyIcons";
import DatePicker from "../../SearchResult/CardItem/DatePicker";
import PropertyMap from "../../MapLocations/PropertyMap";
import { firebaseContext } from "../../Firebase";

const ViewProperty = () => {
  const firebase = useContext(firebaseContext);
  const db = app.firestore();
  const [propertyData, setpropertyData] = useState(null);
  const [files, setFiles] = useState(null);
  const [days, setDays] = useState([]);
  const [user, setUser] = useState(null);
  const [travelers, setTravelers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [people, setPeople] = useState(null);
  const propertyId = window.location.href.split("/")[4];
  const storageRef = app.storage().ref();

  function getImages() {
    var docRef = db.collection("Property").doc(propertyId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setpropertyData(doc.data());
          getUser();
          setTravelers([...Array(parseInt(doc.data().traveler) + 1).keys()]);
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
      urls.forEach((link) => {
        urlList.push({ url: link });
      });
      setFiles(urlList);
    };
    loadImages();
  }

  function getUser() {
    if (firebase.auth.currentUser) {
      setUser(firebase.auth.currentUser.uid);
    }
  }

  useEffect(() => {
    getImages();
    getUser();
  }, []);

  const callback = (nights) => {
    setDays(nights);
  };

  function handleClick() {
    setShowModal(true);
  }

  function handlePeople(e) {
    setPeople(e.target.value);
  }

  return (
    <>
      <HeaderDark />
      <div className="text-center">
        <div className="inline-block">
          <div>{files && <Slider images={files} />}</div>
          <div>
            <div className="relative -top-4" style={{ maxWidth: "896px" }}>
              <div className="relative bg-white p-6 rounded-lg shadow-lg flex">
                <div className="w-1/2">
                  <h2 className="text-4xl font-bold mb-2 text-gray-800">
                    {propertyData && propertyData.name}
                  </h2>
                  <div className="flex justify-center">
                    <div className="flex items-center gold-color mt-2 uppercase text-xs font-semibold tracking-wider">
                      <span className="text-black pr-0.5">
                        <BiMap />
                      </span>
                      {propertyData && propertyData.city}
                    </div>
                  </div>
                  <p className="text-gray-700 text-justify w-full mt-5 ml-2">
                    {propertyData && propertyData.description}
                  </p>
                </div>
                <div className="w-1/2 mt-12">
                  <div className="rounded-t-lg ml-10 pt-2 gold-b-color shadow-inner-lg">
                    {propertyData && (
                      <ViewPropertyIcons
                        bathroom={propertyData.bathroom}
                        room={propertyData.bathroom}
                        traveler={propertyData.traveler}
                      />
                    )}
                  </div>
                  <div className="bg-gray ml-10 p-6 rounded-b-lg shadow-lg">
                    <div className="pb-4">
                      <DatePicker id={propertyId} nights={callback} small />
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="flex items-center justify-around">
                        <BiGroup className="text-3xl mt-2 mr-2" />
                        <div>
                          <select
                            className="border rounded p-2 mt-3 mr-4"
                            onChange={handlePeople}
                          >
                            {travelers}
                            {travelers.map((number) => (
                              <option key={number} value={number}>
                                {number}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {propertyData && user ? (
                        <div className="mt-3">
                          <ModalReservation
                            handleClick={handleClick}
                            days={days}
                            propertyData={propertyData}
                            showModal={showModal}
                            people={people}
                            setShowModal={setShowModal}
                            propertyId={propertyId}
                            user={user}
                          />
                        </div>
                      ) : (
                        <div className="mt-3">
                          <button className="bg-red-200 disabled:opacity-10 text-white font-bold py-2 px-4 rounded inline-flex items-center disabled">
                            <div className="flex items-center">
                              <BiLockAlt className="mr-2" />
                              <span className="ml-1 text-sm">
                                YOU MUST BE LOGGED {user}
                              </span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative bg-white rounded-lg shadow-lg flex mt-3 z-0 mb-20">
                {propertyData && (
                  <PropertyMap position={propertyData.position} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProperty;
