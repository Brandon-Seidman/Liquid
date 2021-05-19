import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import actions from "../actions";
import "../App.css";
import axios from "axios";

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { CommandCursor } from "mongodb";

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
  postBody: {
    margin: 10,
  },
  grid: {
    flexGrow: 2,
    flexDirection: "row",
  },
});

const Friends = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.global);
  let history = useHistory();
  let card = [];

  useEffect(() => {
    async function getData() {
      dispatch(actions.setLoading(true));
      const user = (
        await axios.get(`http://localhost:4000/users/${cookies.get("userId")}`)
      ).data;
      let allPosts = (await axios.get("http://localhost:4000/posts")).data;
      // Using a normal for loop because filter does not use async functions
      let friendPosts = [];
      for (let post of allPosts) {
        const poster = (
          await axios.get(`http://localhost:4000/users/user/${post.user}`)
        ).data;
        if (user.friendList.includes(poster._id)) friendPosts.push(post);
      }
      dispatch(actions.setData(friendPosts));
      dispatch(actions.setLoading(false));
    }
    getData();
  }, []);

  const buildCard = (post) => {
    return (
      <Grid item>
        <Card variant="outlined">
          <CardActionArea
            onClick={(event) => history.push("/post/" + post._id)}
          >
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

  if (data && Array.isArray(data)) {
    card = data.map((post) => {
      return buildCard(post);
    });
  }

  if (loading || !data || !Array.isArray(data)) {
    return (
      <div className={classes.postBody}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <div>Loading...</div>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.postBody}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item className={classes.grid} spacing={1}>
            {card.length > 0 ? card : <h2>No Posts to See</h2>}
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default Friends;
