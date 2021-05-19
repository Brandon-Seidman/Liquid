import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";
import "../App.css";
import axios from "axios";

import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  FormGroup,
  makeStyles,
  Checkbox,
  FormControlLabel,
  TableBody,
  Button,
  Menu,
  MenuItem,
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
});
const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.global);
  const { anchorEl, option } = useSelector((state) => state.filter);
  let history = useHistory();

  const HandleClickButton = (event) => {
    dispatch(actions.setAnchorEl(event.currentTarget));
  };

  const HandleChooseFilter = (option) => {
    console.log(`Handling option: ${option}`);
    dispatch(actions.setOption(option));
    dispatch(actions.setAnchorEl(null));
  };

  useEffect(() => {
    async function getData() {
      dispatch(actions.setLoading(true));
      dispatch(actions.setOption("all"));
      dispatch(actions.setAnchorEl(null));
      let newData = await axios.get("http://localhost:4000/posts");
      dispatch(actions.setData(newData));
      dispatch(actions.setLoading(false));
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      dispatch(actions.setLoading(true));
      let newData;
      switch (option) {
        case "all":
          newData = await axios.get("http://localhost:4000/posts");
          break;
        default:
          newData = await axios.get(`http://localhost:4000/posts/${option}`);
      }
      dispatch(actions.setData(newData));
      dispatch(actions.setLoading(false));
    }
    getData();
  }, [option]);

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
              <Typography>{post.views || 0} views</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
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
      <div className={classes.postBody}>
        <Button onClick={HandleClickButton}>{`Filter by ${option}`}</Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => HandleChooseFilter(option)}
        >
          <MenuItem onClick={() => HandleChooseFilter("all")}>all</MenuItem>
          <MenuItem onClick={() => HandleChooseFilter("mostViewed")}>
            mostViewed
          </MenuItem>
          <MenuItem onClick={() => HandleChooseFilter("mostLiked")}>
            mostLiked
          </MenuItem>
        </Menu>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          {/* <Grid className={classes.filters} item>
            <Card className={classes.cardStyle} variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                  Filter By:
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    label="Alcoholic"
                    control={<Checkbox color="primary" />}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    label="Non-Alcoholic"
                    control={<Checkbox color="primary" />}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    label="Smoothies"
                    control={<Checkbox color="primary" />}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    label="Dairy Free"
                    control={<Checkbox color="primary" />}
                    labelPlacement="end"
                  />
                </FormGroup>
              </CardContent>
            </Card>
          </Grid> */}
          <Grid item className={classes.grid} spacing={1}>
            {data && card}
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default Home;
