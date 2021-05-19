import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { CardActionArea } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent'
import Post from "./components/Post";
import Signup from "./components/Signup";
import MyPage from "./components/MyPage";
import Friends from "./components/Friends";
import Store from "./components/Store";
import PostForm from "./components/PostForm";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthProvider } from "./contexts/AuthContext"
import Mixpanel from "./mixpanel";

const App = () => {
  let history = useHistory();
  const cookies = new Cookies();

  const HandleNavigate = destination => {
    Mixpanel.track("Navigate", { destination: destination });
  }
  
  if (cookies.get("userId")) {
    return (
      <AuthProvider>
      <Router>
        <div className="header">
          <header>
            <CardActionArea href= "/" onClick={() => HandleNavigate("Home")}>
                <img
                  src="liquidLogoSmall.png"
                  height="100px"
                  width="200px"
                  alt="Liquid Logo"
                />
            </CardActionArea>

			 <div className="links">
            <CardActionArea
              onClick={(event) => {
                event.preventDefault();
                cookies.remove("userId", { path: "/" });
                Mixpanel.track("Logout", {});
                window.location.href = "/";
              }}
            >
			<CardContent> Logout </CardContent>
            </CardActionArea>
			</div>

			<div className="links">
            <CardActionArea href="/my-page" onClick={() => HandleNavigate("MyPage")}>
              <CardContent> My Page </CardContent>
            </CardActionArea>
			</div>

			<div className="links">
            <CardActionArea href="/friends" onClick={() => HandleNavigate("Friends")}>
              <CardContent> Friends' Posts </CardContent>
            </CardActionArea>
			</div>
			
			<div className="links">
            <CardActionArea href="/store" onClick={() => HandleNavigate("Store")}>
              <CardContent> Liquid Store </CardContent>
            </CardActionArea>
			</div>
			
			<div className="links">
            <CardActionArea href="/post" onClick={() => HandleNavigate("Post")}>
              <CardContent> Post a Liquid! </CardContent>
            </CardActionArea>
			</div>
			
			<div className="links">
            <CardActionArea href="/chat" onClick={() => HandleNavigate("Chat")}>
              <CardContent> Chat </CardContent>
            </CardActionArea>
			</div>

          </header>
        </div>
        <br />
        <br />
        {
          <div className="App-body">
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/login" component={Home} />
            <Route exact path="/signup" component={Home} />
            <Route exact path="/my-page" component={MyPage} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/store" component={Store} />
            <Route exact path="/post" component={PostForm} />
			<Route exact path="/chat" component={Chat} />
            <Route exact path="/" component={Home} />
          </div>
        }
        <script src="tota11y.min.js"></script>
      </Router>
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
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
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        }
        <script src="tota11y.min.js"></script>
      </Router>
      </AuthProvider>
    );
  }
};

export default App;
