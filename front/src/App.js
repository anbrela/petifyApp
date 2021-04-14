import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from "./Components/Login/Login";
import { UserReducer } from "./Components/UserDispatch";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(["huppy"]);

  return (
    <div className="App">
      <Router>
        <UserReducer>
          <Route
            exact
            path="/"
            component={Login}
          />

        </UserReducer>
      </Router>
    </div>
  );
}

export default App;
