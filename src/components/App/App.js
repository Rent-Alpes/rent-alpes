import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Search from "../Search/Search";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Profil from "../Profil/Profil";
import Home from "../Home/Home";
import ErrorComponent from "../Error404/Error404";
import Property from "../Property/AddProperty";
import GetDataProperty from "../Property/GetDataProperty";
import EditDataProperty from "../Property/EditDataProperty";
import app from "firebase/app";
import React, { useState } from "react";
import { UploadFiles } from "../Property/AddProperty";
import { AddProperty } from "../Algolia/Algolia";
import Review from "../Review/Review";

function App() {
  const idProperty = "";
  const [idproperty, setIdProperty] = useState("Default property");
  const addOrEdit = async (propertyObject) => {
    await app
      .firestore()
      .collection("Property")
      .add(propertyObject)
      .then(function (docRef) {
        UploadFiles(docRef.id);
      });

    console.log(propertyObject);
    await app
      .firestore()
      .collection("Property")
      .add(propertyObject)
      .then(function (docRef) {
        AddProperty(propertyObject, docRef.id);
      });
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/Search" component={Search} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/profil" component={Profil} />
        <Route path="/addproperty">
          <Property addOrEditProperty={addOrEdit} />
        </Route>
        <Route path="/getdataproperty">
          <GetDataProperty
            getIdproperty={idProperty}
            setIdProperty={setIdProperty}
          />
        </Route>
        <Route path="/editdataproperty">
          <EditDataProperty
            addOrEditProperty={addOrEdit}
            idproperty={idproperty}
          />
        </Route>
        <Route path="/review" component={Review} />
        <Route component={ErrorComponent} />
      </Switch>
    </Router>
  );
}

export default App;
