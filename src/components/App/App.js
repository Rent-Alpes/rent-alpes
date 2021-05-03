import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Research from "../Research/Research";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

function App() {

  return (
    <Router>

      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/Research" component={Research} />
        <Route path="/forgetpassword" component={ForgetPassword} />

        {/* PENSER A CREER UN COMPOSANT POUR MAUVAIS PATH */}
      </Switch>

    </Router>
  );
}

export default App;
