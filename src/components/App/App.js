import "../../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import SearchInMap from "../MapLocations/SearchInMap";
import ResultPage from "../SearchResult/ResultPage";
import DatePicker from "../SearchResult/CardItem/DatePicker";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/map" component={SearchInMap} />
        <Route path="/result" component={ResultPage} />
        <Route path="/" component={DatePicker} />
        {/* PENSER A CREER UN COMPOSANT POUR MAUVAIS PATH */}
      </Switch>
    </Router>
  );
}

export default App;
