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
      idUser: user.id,
      travelers: people,
    });
    let url = "/booking";
    history.push(url);
  }
  function handleRegisterClick() {
    setShowModal(false);
    registerReservation();
  }
  function handleClick() {
    setShowModal(true);
  }

  function sendEmail(e) {
    e.preventDefault();
    var Params = {
      name: e.target.name.value,
      start_date: e.target.start_date.value,
      end_date: e.target.end_date.value,
      people: e.target.people.value,
      price: e.target.price.value,
      user_email: e.target.user_email.value,
    };
    emailjs
      .send(
        "service_uwr29sj",
        "template_ggmv67e",
        Params,
        "user_abWxatoleAdQzlnog1Qlr"
      )
      .then(
        (result) => {
          console.log(result.text);
          handleRegisterClick();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <>
      {isNaN(days.numberDays) || people === null ? (
        <button
          onClick={handleClick}
          className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          disabled
        >
          <span className="ml-1 text-sm">Select your dates</span>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <div className="flex items-center">
            <BiCalendar className="mr-2" />
            {propertyData.price * days.numberDays}
            <span className="ml-1 text-sm"> €</span>
          </div>
        </button>
      )}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <form onSubmit={sendEmail}>
                  <div className="flex text-center items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Reservation Info</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto text-center">
                    <div className="text-8xl gold-color flex justify-center">
                      <BiCheckCircle />
                    </div>
                    <p className="my-4 text-blueGray-500 text-lgleading-10">
                      <strong className="mr-2">Property :</strong>
                      <input
                        type="hidden"
                        name="name"
                        value={propertyData.name}
                        disabled
                      />
                      {propertyData.name}
                      <br />
                      <strong className="mr-2">Arrival date :</strong>
                      <input
                        type="hidden"
                        name="start_date"
                        value={moment(days.startDate).format("DD-MM-YYYY")}
                        disabled
                      />
                      {moment(days.startDate).format("DD-MM-YYYY")}

                      <br />
                      <strong className="mr-2">Depart date :</strong>
                      <input
                        type="hidden"
                        name="end_date"
                        value={moment(days.endDate).format("DD-MM-YYYY")}
                        disabled
                      />
                      {moment(days.endDate).format("DD-MM-YYYY")}
                      <br />
                      <strong className="mr-2">Travelers :</strong>
                      <input
                        type="hidden"
                        name="people"
                        value={people}
                        disabled
                      />
                      {people}
                      <br />
                      <strong className="mr-2">Price :</strong>
                      <input
                        type="hidden"
                        name="price"
                        value={propertyData.price * days.numberDays + " €"}
                        disabled
                      />
                      {propertyData.price * days.numberDays + " €"}
                      <input
                        type="hidden"
                        name="user_email"
                        value={user.email}
                        disabled
                      />
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
                      type="submit"
                      value="CONFIRMATION"
                    >
                      <div className="flex items-center">
                        <BiCoin className="mr-2" /> CONFIRMATION
                      </div>
                    </button>
                  </div>
                </form>
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
