import React, { useContext, useEffect, useState } from "react";
import app from "firebase/app";
import { firebaseContext } from "../Firebase";

const GetReservations = (props) => {
  const db = app.firestore();

  const [User, setUser] = useState(null);
  const [reservationList, setReservationList] = useState([]);
  const firebase = useContext(firebaseContext);

  //Récupération de L'id  property
  useEffect(() => {
    firebase.auth.onAuthStateChanged((data) => {
      setUser(data);
      GetReservations(data.uid);
    });
  }, [User, reservationList]);

  const GetReservations = async (id) => {
    const response = db.collection("Booking");
    const data = [];
    const items = await response.where("idUser", "==", id).get();

    items.forEach((item) => {
      data.push({
        idDocument: item.id,
        ...item.data(),
      });
    });
    setReservationList(data);
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="my-2 overflow-x-auto sm:-mx-4 lg:-mx-2 bg-gray-100">
        <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-5">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                  >
                    Property
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                  >
                    Star Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                  >
                    End Date
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                  >
                    Travelers
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-300">
                <tr>
                  <td colSpan="5" className="text-center">
                    {reservationList.length === 0 && (
                      <p className="text-2xl"> You have no property </p>
                    )}
                  </td>
                </tr>
                {reservationList &&
                  reservationList.map((property) => (
                    <tr>
                      <td className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider">
                        <p>{property.startDate}</p>
                      </td>
                      <td className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider">
                        <p>{property.endDate}</p>
                      </td>
                      <td className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider">
                        <p>{property.travelers}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetReservations;
