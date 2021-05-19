import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";
import { useAuth } from '../contexts/AuthContext'

import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
const cookies = new Cookies();
const useStyles = makeStyles({
  cardStyle: {
    maxWidth: 500,
    height: "auto",
    marginTop: 10,
    borderRadius: 6,
  },
  filters: {
    maxWidth: 200,
    height: "auto",
    marginLeft: 20,

    borderRadius: 6,
  },
  grid: {
    flexGrow: 2,
    flexDirection: "row",
  },
  loginBody: {
    height: "auto",
    marginTop: 10,
    marginLeft: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  loginForm: {
    maxWidth: 300,
    justifyContent: "center",
    marginBottom: 50,
    marginLeft: 115,
  },
  error: {
    color: "red",
  },
});
const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { values, formLoading } = useSelector((state) => state.form);
  const { error } = useSelector((state) => state.global);
  let history = useHistory();
  const { loginauth } = useAuth();

  useEffect(() => {
    if (cookies.get("userId")) {
      history.push("/");
    }
    dispatch(actions.setValues({ email: "", username: "", password: "" }));
    dispatch(actions.setError(false));
    dispatch(actions.setFormLoading(false));
  }, []);

  async function HandleLogin(event) {
    try {
      dispatch(actions.setFormLoading(true));
      let login = await axios.post("http://localhost:4000/users", {
        data: { username: values.username, password: values.password },
      });

      let user = await axios.get(
        "http://localhost:4000/users/user/" + values.username
      );

      if (login.data.password === "Correct") {
        try{
          await loginauth(values.email, values.password)
        } catch (e) {
          dispatch(actions.setError(true));
          dispatch(actions.setFormLoading(false));
          return;
        }
        await cookies.set("userId", user.data._id, { path: "/" });
        window.location.href = window.location.href;
      } else {
        dispatch(actions.setError(true));
        dispatch(actions.setFormLoading(false));
      }
    } catch (e) {
      dispatch(actions.setError(true));
      dispatch(actions.setFormLoading(false));
    }
  }
  const set = (name) => {
    return ({ target: { value } }) => {
      dispatch(actions.updateValue(name, value));
    };
  };

  return (
    <div>
      <div className={classes.loginBody}>
        <Typography gutterBottom variant="h2" component="h1">
          Welcome back to Liquid!
        </Typography>
        <Card variant="outlined" className={classes.loginForm}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h3">
              {" "}
              Login
          </Typography>
          <form id="login-form">
            <TextField
              value={values.email}
              onChange={set("email")}
              id="email"
              label="Email"
              type="email"
            />
            <br />
            <br />
            <br />
            <TextField
              value={values.username}
              onChange={set("username")}
              id="username"
              label="Username"
            />
            <br />
            <br />
            <br />
            <TextField
              value={values.password}
              onChange={set("password")}
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <br />
            <br />
            <br />

            <Button onClick={HandleLogin}>Submit</Button>
          </form>
          <Link className="Link" to="/signup">
            Don't have an account yet? Sign up here!
          </Link>
          {formLoading && (
            <Typography className={classes.error}>
              Logging in...
            </Typography>
          )}
          {error && (
            <Typography className={classes.error}>
              Invalid Username or Password
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Login;
