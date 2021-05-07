import React, { useState, useEffect } from "react";
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
});
const Home = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let newData = await axios.get(
        "http://localhost:4000/posts/" + props.match.params.id
      );

      console.log(newData);
      setData(newData);
      setLoading(false);
    }
    getData();
  }, []);

  const buildCard = (comment) => {
    return (
      <Grid item>
        <Card variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h3" component="h2">
                {comment.post}
              </Typography>
              <Typography gutterBottom variant="h6" component="h3">
                {comment.description}
              </Typography>
              <Typography>Posted By: {comment.commentBy}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };
  let card = {};
  if (data && data.data && data.data.comments) {
    card = data.data.comments.map((comment) => {
      return buildCard(comment);
    });
  }
  if (loading) {
    return (
      <div className="postsBody">
        <div>Loading...</div>
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
            <Grid item>
              <Card variant="outlined">
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h2">
                      {data.data.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h3">
                      {data.data.description}
                    </Typography>
                    <Typography>
                      Ingredients Needed:
                      {data.data.ingredients.map((ingredients) => {
                        return <li>{ingredients}</li>;
                      })}
                    </Typography>
                    <Typography>Posted By: {data.data.user}</Typography>
                    <Typography> {data.data.likes} Likes</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            {data.data.comments && card}
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default Home;
