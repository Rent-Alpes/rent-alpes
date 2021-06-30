import React, { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";
import Table from "react-tailwind-table";
import app from "firebase/app";
import { useHistory } from "react-router-dom";

const GetReviewList = () => {
  const db = app.firestore();
  const [userSession, setUserSession] = useState(null);
  const firebase = useContext(firebaseContext);
  let history = useHistory();
  const [reviewList, setReviewList] = useState([]);

  //Récupération de L'id  property
  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : history.push("/login");
    });

    if (!!userSession) {
      db.collection("Review")
        .get()
        .then((review) => {
          review.forEach((doc) => {
            if (doc.data().idUser == userSession.uid) {
              var idProperty = doc.data().idProperty;
              db.collection("Property")
                .doc(idProperty)
                .get()
                .then((property) => {
                  setReviewList((review) => [
                    ...review,
                    {
                      name: property.data().name,
                      title: doc.data().title,
                      comment: doc.data().comment,
                      cleanless: doc.data().cleanless,
                      location: doc.data().location,
                      equipments: doc.data().equipments,
                      averageRating: doc.data().averageRating,
                      idProp: property.id,
                      idReview: doc.id,
                      propertyData: property.data(),
                    },
                  ]);
                });
            }
          });
        });
    }

    return () => {
      listener();
    };
  }, [userSession]);

  const rowcheck = (row, column, display_value) => {
    if (column.field === "idReview") {
      return (
        <button
          onClick={() => deleteReview(display_value)}
          className="border p-2 bg-red-700 text-white font-bold"
        >
          DELETE
        </button>
      );
    }
  };

  function deleteReview(docID) {
    var reviewCollec = db.collection("Review");
    reviewCollec
      .doc(docID)
      .get()
      .then((doc) => {
        var dataReview = doc.data().idProperty;
        db.collection("Property")
          .doc(dataReview)
          .update({
            avis: firebase.firebase.firestore.FieldValue.arrayRemove(docID),
          })
          .then(reviewCollec.doc(docID).delete(), document.location.reload());
      });
  }

  const columns = [
    {
      field: "name",
      use: "Property",
    },
    {
      field: "title", //Object destructure
      use: "Title",
    },

    {
      field: "comment",
      use: "Comment",
      // use_in_search:false
    },
    {
      field: "cleanless",
      use: "Cleanless Rating",
      // use_in_search:false
    },
    {
      field: "location",
      use: "Location Rating",
      // use_in_search:false
    },
    {
      field: "equipments",
      use: "Equipments Rating",
      // use_in_search:false
    },
    {
      field: "averageRating",
      use: "Average Rating",
    },
    {
      field: "idReview",
      use: "Actions",
      use_in_search: false,
    },
  ];

  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="w-4/5">
        <Table
          columns={columns}
          rows={reviewList}
          table_header="Your Review's List"
          row_render={rowcheck}
          show_search={false}
        />
      </div>
    </div>
  );
};

export default GetReviewList;
