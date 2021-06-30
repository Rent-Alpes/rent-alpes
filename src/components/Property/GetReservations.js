import React, { useContext, useEffect, useState } from "react";
import app from "firebase/app";
import { firebaseContext } from "../Firebase";
import Table from "react-tailwind-table";

const GetReservations = (props) => {
  const db = app.firestore();
  const properties = props.propertyList.properties;
  const [reservationList, setReservationList] = useState([]);
  const firebase = useContext(firebaseContext);

  //Récupération de L'id  property
  useEffect(() => {
    firebase.auth.onAuthStateChanged((data) => {
      GetReservations(data.uid);
    });
  }, [reservationList]);

  const rowcheck = (row, column, display_value) => {
    if (column.field === "idDocument") {
      return (
        <button
          onClick={() => deleteReservation(display_value)}
          className="border p-2 bg-red-700 text-white font-bold"
        >
          DELETE
        </button>
      );
    }
    /*if (column.field === "name") {
      return <a href={"/view-property/" + row.idDocument}>{display_value}</a>;
    }*/
  };

  function deleteReservation(docID) {
    db.collection("Booking")
      .doc(docID)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  const GetReservations = async (id) => {
    const response = db.collection("Booking");
    const data = [];
    const items = await response.where("idUser", "==", id).get();

    items.forEach((item) => {
      const res = properties.find(
        (property) => property.id === item.data().idProperty
      );
      data.push({
        idDocument: item.id,
        name: res.name,
        ...item.data(),
      });
    });
    setReservationList(data);
  };

  const columns = [
    {
      field: "name",
      use: "Property",
    },
    {
      field: "startDate", //Object destructure
      use: "Start Date",
    },

    {
      field: "endDate",
      use: "End Date",
      // use_in_search:false
    },
    {
      field: "travelers",
      use: "Travelers",
      // use_in_search:false
    },
    {
      field: "idDocument",
      use: "Actions",
      use_in_search: false,
    },
  ];

  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="w-4/5">
        <Table
          columns={columns}
          rows={reservationList}
          table_header="Your Reservation's List"
          row_render={rowcheck}
          show_search={false}
        />
      </div>
    </div>
  );
};

export default GetReservations;
