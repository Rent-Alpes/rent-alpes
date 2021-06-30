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
import { data } from "autoprefixer";
import AddReview from "../../Review/AddReview";
import GetReview from "../../Review/GetReview";

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
  const [averageRatingReview, setAverageRatingReview] = useState(0);
  const [ivalue, setIvalue] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [showModalAddReview, setShowModalAddReview] = useState(false);
  const [showModalGetReview, setShowModalGetReview] = useState(false);

  function getImages() {
    var docRef = db.collection("Property").doc(propertyId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setpropertyData(doc.data());
          getUser();
          setTravelers([...Array(parseInt(doc.data().traveler) + 1).keys()]);
          const reviews = doc.data().avis;
          reviews.forEach((review) =>
            firebase
              .review()
              .doc(review)
              .get()
              .then(
                (rev) =>
                  setAverageRatingReview(
                    (rate) => rate + rev.data().averageRating
                  ),
                setIvalue((numb) => numb + 1)
              )
          );
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
      setUser(firebase.auth.currentUser.uid,
             email: firebase.auth.currentUser.email);

      var docBooking = db.collection("Booking");

      docBooking.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (
            doc.data().idUser == firebase.auth.currentUser.uid &&
            doc.data().idProperty == propertyId
          ) {
            setIsBooking(true);
          }
        });
      });
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

  function handleClickAddReview() {
    setShowModalAddReview(true);
  }

  function handleClickGetReview() {
    setShowModalGetReview(true);
  }

  function handlePeople(e) {
    setPeople(e.target.value);
  }

  //Affichage Review
  const displayReview = averageRatingReview !== 0 && (
    <div className="text-3xl text-gray-800 ">
      <div className="absolute mt-2">
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 cursor-pointer star mt-auto"
            fill="none"
            viewBox="0 0 20 20"
            fill="currentColor"
            color={"#ffc107"}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {(averageRatingReview / ivalue).toFixed(1)}/5
        </div>
        <GetReview
          handleClick={handleClickGetReview}
          setShowModalGetReview={setShowModalGetReview}
          propertyId={propertyId}
          propertyName={propertyData.name}
        />
      </div>
    </div>
  );

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
                  <h2 className="text-4xl mb-2 text-gray-800">
                    {displayReview}
                    <p className="font-bold">
                      {propertyData && propertyData.name}
                    </p>
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
                      {propertyData && user.id ? (
                        <div className="mt-3">
                          <ModalReservation
                            handleClick={handleClick}
                            days={days}
                            propertyData={propertyData}
                            showModal={showModal}
                            people={people}
                            setShowModal={setShowModal}
                            propertyId={propertyId}
                            user={user.id}
                            mail={user.email}
                          />
                        </div>
                      ) : (
                        <div className="mt-3">
                          <button className="bg-red-200 disabled:opacity-10 text-white font-bold py-2 px-4 rounded inline-flex items-center disabled">
                            <div className="flex items-center">
                              <BiLockAlt className="mr-2" />
                              <span className="ml-1 text-sm">
                                YOU MUST BE LOGGED
                              </span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                    {isBooking && (
                      <AddReview
                        handleClick={handleClickAddReview}
                        setShowModalAddReview={setShowModalAddReview}
                        propertyId={propertyId}
                      />
                    )}
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
