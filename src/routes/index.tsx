import "../App.css";
import { Route,  BrowserRouter as Router , Switch } from "react-router-dom";
import Home from "../Home";
import RedirectRoute from "../routes/RedirectRoute";
import PrivateRoute from "../routes/PrivateRoute";
const Index = () => {

  return (
      <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
        </Switch>
      </Router>

  </>
  );
};

export default Index;
