import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";

import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  makeStyles,
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
  postBody: {
    margin: 10,
  },
  grid: {
    flexGrow: 2,
    flexDirection: "row",
  },
  error: {
    color: "red",
    marginLeft: 400,
    fontSize: 44,
  },
});
const cookies = new Cookies();

const Store = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.global);
  const { unlock } = useSelector((state) => state.store);
  let history = useHistory();

  useEffect(() => {
    dispatch(actions.setError(false));
    dispatch(actions.setUnlock(false));
  }, []);

  useEffect(() => {
    async function getData() {
      dispatch(actions.setLoading(true));

      let newData = await axios.get("http://localhost:4000/posts/lockedPosts");
      console.log(newData);
      dispatch(actions.setData(newData));
      dispatch(actions.setLoading(false));
    }
    getData();
  }, [, unlock]);

  async function handleUnlock(id) {
    dispatch(actions.setUnlock(false));
    dispatch(actions.setError(false));
    let unlockedData = await axios.post(
      "http://localhost:4000/posts/lockedPosts/unlock/",
      { userId: cookies.get("userId"), postId: id }
    );
    if (unlockedData.data.response === "success") {
      dispatch(actions.setUnlock(true));
    } else if (unlockedData.data.response === "insufficient funds") {
      dispatch(actions.setError(true));
    }
  }

  const buildCard = (post) => {
    return (
      <div className="full">
        <Grid item>
          {post.unlocked.includes(cookies.get("userId")) && (
            <Card variant="outlined">
              <div className="card">
                <CardContent>
                  <div className="title">
                    <Typography gutterBottom variant="h3" component="h2">
                      {post.title}
                    </Typography>
                  </div>
                  <Typography gutterBottom variant="h6" component="h3">
                    {post.description}
                  </Typography>
                  <Typography>
                    Ingredients Needed:
                    {post.ingredients.map((ingredients) => {
                      return <li>{ingredients}</li>;
                    })}
                  </Typography>
                  <Typography>Posted By: Liquid Guru</Typography>
                </CardContent>
              </div>
            </Card>
          )}
          {!post.unlocked.includes(cookies.get("userId")) && (
            <Card variant="outlined">
              <div className="card">
                <CardContent>
                  <div className="title">
                    <Typography gutterBottom variant="h3" component="h2">
                      {post.title}
                    </Typography>
                  </div>
                  <div className="title">
                    <Typography gutterBottom variant="h6" component="h3">
                      {post.points}
                    </Typography>
                  </div>
                  <Button onClick={() => handleUnlock(post._id)}>
                    Unlock Now!
                  </Button>

                  <Typography>Posted By: Liquid Guru</Typography>
                </CardContent>
              </div>
            </Card>
          )}
        </Grid>
      </div>
    );
  };

  let card = {};
  if (data && data.data && Array.isArray(data.data)) {
    card = data.data.map((posts) => {
      return buildCard(posts);
    });
  }

  if (loading || !data || !data.data || !Array.isArray(data.data)) {
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
        {error && (
          <Typography className={classes.error}>
            Insufficient funds :({" "}
          </Typography>
        )}
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item className={classes.grid} spacing={1}>
            {data && card}
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default Store;
