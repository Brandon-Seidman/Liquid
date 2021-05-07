import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";

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
  const [values, setValues] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [usernameTaken, setUsernameTakenError] = useState(false);
  let history = useHistory();

  async function HandleLogin(event) {
    try {
      setUsernameTakenError(false);
      if (values.rePassword !== values.password) {
        setPasswordError(true);
        setPasswordLengthError(false);
        return;
      }
      if (values.password.length < 5) {
        setPasswordLengthError(true);
        setPasswordError(false);
        return;
      }
      let signup = await axios.post("http://localhost:4000/users/signup", {
        data: { username: values.username, password: values.password },
      });
      console.log(signup);
      if (signup.data.username === "added") {
        history.push("/");
      } else if (signup.data.username === "taken") {
        setUsernameTakenError(true);
        return;
      } else {
        setError(true);
        return;
      }
    } catch (e) {
      setError(true);
    }
  }
  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
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
          {usernameTaken && (
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
