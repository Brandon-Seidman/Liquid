import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  makeStyles
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
});
const MyPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.global);
  const { userData } = useSelector(state => state.user);
  let history = useHistory();

  useEffect(() => {
    async function getData() {
      dispatch(actions.setLoading(true));
      let newData = await axios.post("http://localhost:8080/posts/liked", {
        userId: cookies.get("userId"),
      });
      let newUserData = await axios.get(
        "http://localhost:8080/users/" + cookies.get("userId")
      );
      dispatch(actions.setUser(newUserData));
      dispatch(actions.setData(newData));
      dispatch(actions.setLoading(false));
    }
    getData();
  }, []);

  const buildCard = (post) => {
    return (
      <Grid item>
        <Card variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h3" component="h2">
                {post.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="h3">
                {post.description}
              </Typography>
              <Typography>
                Ingredients Needed:
                {post.ingredients.map((ingredients) => {
                  return <li>{ingredients}</li>;
                })}
              </Typography>
              <Typography>Posted By: {post.user}</Typography>
              <Typography>{post.likes} likes</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  let card = {};
  if (data && data.data) {
    card = data.data.map((posts) => {
      return buildCard(posts);
    });
  }
  if (loading || !data || !data.data || !Array.isArray(data.data) || !userData) {
    return (
      <div className="postsBody">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <h2>My Likes</h2>
          <div>Loading</div>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className="postsBody">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h3" component="h2">
                My Username: {userData.data.username}
              </Typography>
              <Typography gutterBottom variant="h6" component="h3">
                My Points: {userData.data.points}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <h1>My Likes</h1>
          <Grid item className={classes.grid} spacing={1}>
            {data && card}
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default MyPage;
