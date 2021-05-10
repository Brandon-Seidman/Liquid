import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Cookies from "universal-cookie";

import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Button,
  Grid,
  Typography,
  FormGroup,
  makeStyles,
  Checkbox,
  FormControlLabel,
  TableBody,
} from "@material-ui/core";
import ActionSettingsInputAntenna from "material-ui/svg-icons/action/settings-input-antenna";

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
const cookies = new Cookies();

const Home = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlock, setUnlock] = useState(false);
  let history = useHistory();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let newData = await axios.get("http://localhost:4000/posts/lockedPosts");
      console.log(newData);
      setData(newData);
      setLoading(false);
    }
    getData();
  }, [, unlock]);

  async function handleUnlock(id) {
    setUnlock(false);
    let unlockedData = await axios.post(
      "http://localhost:4000/posts/lockedPosts/unlock/",
      { userId: cookies.get("userId"), postId: id }
    );
    setUnlock(true);
  }
  const buildCard = (post) => {
    return (
      <Grid item>
        {post.unlocked && (
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
                <Typography>Posted By: Liquid Guru</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
        {!post.unlocked && (
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h3" component="h2">
                {post.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="h3">
                {post.points}
              </Typography>
              <Button onClick={() => handleUnlock(post._id)}>
                Unlock Now!
              </Button>
              <Typography>Posted By: Liquid Guru</Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    );
  };

  let card = {};
  if (data && data.data) {
    card = data.data.map((posts) => {
      return buildCard(posts);
    });
  }

  if (loading) {
    return (
      <div className="postsBody">
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
      <div className="postsBody">
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
export default Home;
