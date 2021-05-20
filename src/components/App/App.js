import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Profil from "../Profil/Profil";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Administration from "../Administration/Administration";

function App() {

  return (
    <Router>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/header" component={Header} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/profil" component={Profil} />
        <Route path="/administration" component={Administration} />

        {/* PENSER A CREER UN COMPOSANT POUR MAUVAIS PATH */}
      </Switch>

    </Router>
  );
}

export default App;
