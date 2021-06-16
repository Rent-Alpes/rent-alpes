import React from "react";
import { BiCalendar, BiCheckCircle, BiCoin, BiXCircle } from "react-icons/bi";
import app from "firebase/app";
import moment from "moment";

const ModalReservation = (props) => {
  const db = app.firestore();

  function handleClick() {
    props.setShowModal(false);
    return db.collection("Booking").add({
      startDate: props.reservation[0],
      endDate: props.reservation[1],
      price: props.propertyData.price,
      idProperty: props.reservation[2],
      idUser: props.reservation[3],
    });
  }
  return (
    <>
      <button
        onClick={props.handleClick}
        className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        {props.days.numberDays !== undefined ? (
          <div className="flex items-center">
            <BiCalendar className="mr-2" />
            {props.propertyData.price * props.days.numberDays}
            <span className="ml-1 text-sm"> €</span>
          </div>
        ) : (
          <span className="ml-1 text-sm">Select your dates</span>
        )}
      </button>
      {props.showModal ? (
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
                    {props.propertyData.name}
                    <br />
                    <strong>Arrival date :</strong>
                    {props.reservation[0]}
                    <br />
                    <strong>Depart date :</strong>
                    {props.reservation[1]}
                    <br />
                    <strong>Price :</strong>
                    {props.propertyData.price * props.days.numberDays} €
                    <br />
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 mr-6 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    <div className="flex items-center">
                      <BiXCircle className="mr-2" /> CANCEL
                    </div>
                  </button>
                  <button
                    className="bg-gold text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
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
