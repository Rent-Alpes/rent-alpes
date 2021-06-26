import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Search from "../Search/Search";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Profil from "../Profil/Profil";
import Home from "../Home/Home";
import HeaderDark from "../HeaderDark/HeaderDark";
import ErrorComponent from "../Error404/Error404";
import Property from "../Property/AddProperty";
import ViewProperty from "../Property/ViewProperty/ViewProperty";
import GetDataProperty from "../Property/GetDataProperty";
import EditDataProperty from "../Property/EditDataProperty";
import Privacy from "../Privacy/Privacy";
import app from "firebase/app";
import React, { useState } from "react";
import { UploadFiles } from "../Property/AddProperty";
import { AddProperty } from "../Algolia/Algolia";

function App() {
  const idProperty = "";
  const [idproperty, setIdProperty] = useState("Default property");
  const addOrEdit = async (propertyObject) => {
    await app
      .firestore()
      .collection("Property")
      .add(propertyObject)
      .then(function (docRef) {
        AddProperty(propertyObject, docRef.id);
        UploadFiles(docRef.id);
      });
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup">
          <HeaderDark />
          <Signup />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/forgetpassword">
          <HeaderDark />
          <ForgetPassword />
        </Route>
        <Route path="/profil">
          <HeaderDark />
          <Profil />
        </Route>
        <Route path="/search" component={Search} />
        <Route path="/addproperty">
          <HeaderDark />
          <Property addOrEditProperty={addOrEdit} />
        </Route>
        <Route path="/privacy">
          <HeaderDark />
          <Privacy />
        </Route>
        <Route path="/getdataproperty">
          <HeaderDark />
          <GetDataProperty
            getIdproperty={idProperty}
            setIdProperty={setIdProperty}
          />
        </Route>
        <Route path="/editdataproperty">
          <HeaderDark />
          <EditDataProperty
            addOrEditProperty={addOrEdit}
            idproperty={idproperty}
          />
        </Route>
        <Route path="/view-property">
          <ViewProperty idproperty={idproperty} />
        </Route>
        <Route component={ErrorComponent} />
      </Switch>
    </Router>
  );
}

export default App;
