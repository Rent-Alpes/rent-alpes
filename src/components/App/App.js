import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Property from "../Property/PropertyForm";
import { HereProvider } from "leaflet-geosearch";
import app from "firebase/app";
import React from "react";

function App() {
  const [properties, setProperties] = React.useState({});
  const addOrEdit = async (propertyObject) => {
    console.log(propertyObject);
    await app.firestore().collection("Property").doc().set(propertyObject);
  };

  const provider = new HereProvider({
    params: {
      apiKey: "eRz09NXRI4hfk_pkqkcZvZ-4DhsJLTEpBCiEfEgGxb8",
    },
  });

  const getResult = async (e) => {
    provider.search({ query: e.value }).then(function (result) {
      // do something with result;
      console.log(e);
    });
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
        <Route path="/property">
          <Property addOrEditProperty={addOrEdit} />
        </Route>

        {/* PENSER A CREER UN COMPOSANT POUR MAUVAIS PATH */}
      </Switch>
    </Router>
  );
}

export default App;
