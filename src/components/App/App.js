import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Search from "../Search/Search";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Property from "../Property/PropertyForm";
import app from "firebase/app";
import React from "react";

function App() {
  const addOrEdit = async (propertyObject) => {
    console.log(propertyObject);
    await app.firestore().collection("Property").doc().set(propertyObject);
  };
  
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/Search" component={Search} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/property">
          <Property addOrEditProperty={addOrEdit} />
        </Route>

        {/* PENSER A CREER UN COMPOSANT POUR MAUVAIS PATH */}
      </Switch>
    </Router>
  );
}

export default App;


