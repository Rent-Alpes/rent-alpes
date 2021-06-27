import React from "react";
import { BiCalendar, BiCheckCircle, BiCoin, BiXCircle } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import app from "firebase/app";
import moment from "moment";
import emailjs from "emailjs-com";

const ModalReservation = ({
  user,
  propertyId,
  propertyData,
  setShowModal,
  days,
  showModal,
  people,
}) => {
  const db = app.firestore();
  const history = useHistory();

  function registerReservation() {
    db.collection("Booking").add({
      startDate: moment(days.startDate).format("DD/MM/YYYY"),
      endDate: moment(days.endDate).format("DD/MM/YYYY"),
      price: propertyData.price,
      idProperty: propertyId,
      idUser: user,
      travelers: people,
    });
    let url = "/getreservations";
    history.push(url);
  }

  function handleRegisterClick() {
    setShowModal(false);
    registerReservation();
  }

  function handleClick() {
    setShowModal(true);
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        {isNaN(days.numberDays) ? (
          <span className="ml-1 text-sm">Select your dates</span>
        ) : (
          <div className="flex items-center">
            <BiCalendar className="mr-2" />
            {propertyData.price * days.numberDays}
            <span className="ml-1 text-sm"> €</span>
          </div>
        )}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex text-center items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Reservation Info</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto text-center">
                  <div className="text-8xl gold-color flex justify-center">
                    <BiCheckCircle />
                  </div>
                  <p className="my-4 text-blueGray-500 text-lgleading-10">
                    <strong>Property :</strong>
                    {propertyData.name}
                    <br />
                    <strong>Arrival date :</strong>
                    {moment(days.startDate).format("DD-MM-YYYY")}
                    <br />
                    <strong>Depart date :</strong>
                    {moment(days.endDate).format("DD-MM-YYYY")}
                    <br />
                    <strong>Travelers :</strong>
                    {people}
                    <br />
                    <strong>Price :</strong>
                    {propertyData.price * days.numberDays} €
                    <br />
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 mr-6 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <div className="flex items-center">
                      <BiXCircle className="mr-2" /> CANCEL
                    </div>
                  </button>
                  <button
                    className="bg-gold text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleRegisterClick}
                  >
                    <div className="flex items-center">
                      <BiCoin className="mr-2" /> CONFIRMATION
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalReservation;
