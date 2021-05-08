import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Profil from "../Profil/Profil";
import Home from "../Home/Home";

function App() {

  return (
    <Router>

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/profil" component={Profil} />

        {/* PENSER A CREER UN COMPOSANT POUR MAUVAIS PATH */}
      </Switch>

    </Router>
  );
}

export default App;
