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
      let newData = await axios.get("http://localhost:4000/posts");
      console.log(newData.data);
      setData(newData);
      setLoading(false);
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
              <Typography>Posted By: {post.likes}</Typography>
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
          <Grid className={classes.filters} item>
            <Card variant="outlined">
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
          </Grid>
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
          <Grid className={classes.filters} item>
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
          </Grid>
          <Grid item className={classes.grid} spacing={1}>
            {data && card}
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default Home;
