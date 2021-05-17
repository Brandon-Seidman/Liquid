import React, { useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';

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
    marginLeft: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  loginForm: {
    maxWidth: 300,
    justifyContent: "center",
    marginBottom: 50,
    marginLeft: 90,
  },
  error: {
    color: "red",
  },
});
const Signup = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { values } = useSelector(state => state.form);
  const { error } = useSelector(state => state.global);
  const {
    passwordError,
    passwordLengthError,
    usernameTakenError
  } = useSelector(state => state.signup);
  let history = useHistory();

  useEffect(() => {
    dispatch(actions.setValues({
      username: "",
      password: "",
      rePassword: "",
    }));
    dispatch(actions.setError(false));
    dispatch(actions.clearSignupErrors());
  }, []);

  async function HandleLogin(event) {
    try {
      dispatch(actions.setUsernameTakenError(false));
      if (values.rePassword !== values.password) {
        dispatch(actions.setPasswordError(true));
        dispatch(actions.setPasswordLengthError(false));
        return;
      }
      if (values.password.length < 5) {
        dispatch(actions.setPasswordLengthError(true));
        dispatch(actions.setPasswordError(false));
        return;
      }
      let signup = await axios.post("http://https://aws-branch.dw6otddguzk2g.amplifyapp.com//users/signup", {
        data: { username: values.username, password: values.password },
      });
      let user = await axios.get(
        "http://https://aws-branch.dw6otddguzk2g.amplifyapp.com//users/user/" + values.username
      );
      if (signup.data.username === "added") {
        cookies.set("userId", user._id);
        history.push("/");
      } else if (signup.data.username === "taken") {
        dispatch(actions.setUsernameTakenError(true));
        return;
      } else {
        dispatch(actions.setError(true));
        return;
      }
    } catch (e) {
      dispatch(actions.setError(true));
    }
  }
  const set = (name) => {
    return ({ target: { value } }) => {
      dispatch(actions.updateValue(name, value));
    };
  };

  return (
    <div className={classes.loginBody}>
      <Typography gutterBottom variant="h2" component="h1">
        Welcome to Liquid!
      </Typography>
      <Card variant="outlined" className={classes.loginForm}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {" "}
            Signup!
          </Typography>
          <form id="login-form">
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
            />
            <br />
            <br />
            <br />
            <TextField
              value={values.rePassword}
              onChange={set("rePassword")}
              id="rePassword"
              label="Re-enter Password"
            />
            <br />
            <br />
            <br />
            <Button onClick={HandleLogin}>Submit</Button>
          </form>
          <Link className="Link" to="/login">
            Already have an account? Login here!
          </Link>
          {error && (
            <Typography className={classes.error}>
              Oh no! Something went wrong :(
            </Typography>
          )}
          {passwordError && (
            <Typography className={classes.error}>
              Passwords do not match
            </Typography>
          )}
          {passwordLengthError && (
            <Typography className={classes.error}>
              Password must be at least 5 characters
            </Typography>
          )}
          {usernameTakenError && (
            <Typography className={classes.error}>
              Username already taken :(
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
