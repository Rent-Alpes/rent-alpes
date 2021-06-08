import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Profil from "../Profil/Profil";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Property from "../Property/AddProperty";
import GetDataProperty from "../Property/GetDataProperty";
import EditDataProperty from "../Property/EditDataProperty";
import app from "firebase/app";
import React, { useState } from "react";
import {UploadFiles} from "../Property/AddProperty";

function App() {
  const idProperty="";
  const [idproperty,setIdProperty]=useState('Default property');
  const addOrEdit = async (propertyObject) => {
    await app.firestore().collection("Property").add(propertyObject).then(function(docRef){
      UploadFiles(docRef.id);
    });


  };

 /* const getData = async (propertyObject) => {
    //console.log(propertyObject);
    //const propertyList = await app.firestore().collection("Property").doc().get().where('IdUser', '==', "GsA2tiwaaYV5CFBxVRYqa4HQIcx1");
      // console.log(propertyList);
       console.log("je suis la");
    const prop=await app.firestore().collection("Property").doc().get(propertyObject);
    console.log(prop);
  };*/

  return (
    <Router>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/header" component={Header} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/profil" component={Profil} />
        <Route path="/addproperty">
          <Property addOrEditProperty={addOrEdit} />
        </Route>
        <Route path="/getdataproperty">
          <GetDataProperty getIdproperty={idProperty} setIdProperty={setIdProperty}/>
          </Route>
          <Route path="/editdataproperty">
          <EditDataProperty addOrEditProperty={addOrEdit} idproperty={idproperty} />
          </Route>
        {/* PENSER A CREER UN COMPOSANT POUR MAUVAIS PATH */}
      </Switch>
    </Router>
  );
}

export default App;