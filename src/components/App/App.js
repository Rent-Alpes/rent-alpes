import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Property from "../Property/PropertyForm";
import SearchInMap from "../MapLocations/SearchInMap";
import CardProperty from "../Property/CardProperty";
import app from "firebase/app";
import React from "react";

function App() {
  const [properties, setProperties] = React.useState({});
  const addOrEdit = async (propertyObject) => {
    console.log(propertyObject);
    await app.firestore().collection("Property").doc().set(propertyObject);
  };

  React.useEffect(() => {
    getProperty();
  }, []);

  const propertyRef = app.firestore().collection("Property");

  const getProperty = async () => {
    const querySnapshot = await propertyRef.get();
    querySnapshot.forEach((doc) => {
      setProperties(doc.id, "=>", doc.data());
    });
  };
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/map" component={SearchInMap} />
        <Route path="/property">
          <Property addOrEditProperty={addOrEdit} />
        </Route>
        <Route path="/card">
          <div>
            <CardProperty />
          </div>
        </Route>

        {/* PENSER A CREER UN COMPOSANT POUR MAUVAIS PATH */}
      </Switch>
    </Router>
  );
}

export default App;
