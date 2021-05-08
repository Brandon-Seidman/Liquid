import React from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { CardActionArea } from "@material-ui/core";
import Post from "./components/Post";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const App = () => {
  let history = useHistory();
  const cookies = new Cookies();
  if (cookies.get("userId")) {
    return (
      <Router>
        <div className="header">
          <header>
            <CardActionArea>
              <Link to="/">
                <img
                  src="liquidLogoSmall.png"
                  height="100px"
                  width="200px"
                  alt="Liquid Logo"
                />
              </Link>
            </CardActionArea>
            <CardActionArea
              onClick={(event) => {
                event.preventDefault();
                cookies.remove("userId", { path: "/" });
                console.log("cookie removed!");
              }}
            >
              <Link to="/login">Logout</Link>
            </CardActionArea>
          </header>
        </div>
        <br />
        <br />
        {
          <div className="App-body">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/:id" component={Post} />
          </div>
        }
        <script src="tota11y.min.js"></script>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="header">
          <header>
            <CardActionArea>
              <Link to="/">
                <img
                  src="liquidLogoSmall.png"
                  height="100px"
                  width="200px"
                  alt="Liquid Logo"
                />
              </Link>
            </CardActionArea>
          </header>
        </div>
        <br />
        <br />
        {
          <div className="App-body">
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/:id" component={Post} />
          </div>
        }
        <script src="tota11y.min.js"></script>
      </Router>
    );
  }
};

export default App;
