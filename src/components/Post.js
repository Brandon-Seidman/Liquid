import React, { useEffect } from "react";
import "../App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";
import Mixpanel from "../mixpanel";

import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField,
  Link,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

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
  error: {
    color: "red",
  },
});
const Post = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.global);
  const { liked, likes, isFriend } = useSelector((state) => state.post);
  const { values } = useSelector((state) => state.form);

  async function HandleSubmit(event) {
    try {
      let user = (
        await axios.get(`http://localhost:4000/users/${cookies.get("userId")}`)
      ).data;
      let result = await axios.post(
        `http://localhost:4000/posts/comment/${props.match.params.id}`,
        {
          commentBy: user.username,
          title: values.title.trim(),
          description: values.description.trim(),
        }
      );
      Mixpanel.track("Commented on Post", { poster: data.data.user });
      window.location.href = window.location.href;
    } catch (e) {
      console.log(e);
      dispatch(actions.setError(true));
    }
  }

  async function HandleFriend(event) {
    try {
      const poster = (
        await axios.get(`http://localhost:4000/users/user/${data.data.user}`)
      ).data;
      const action = isFriend ? "unfriend" : "friend";
      await axios.post(
        `http://localhost:4000/users/${action}/${cookies.get("userId")}/${
          poster._id
        }`
      );
      
      if (isFriend) {
        Mixpanel.track("Unfriended User", { user: data.data.user });
      } else {
        Mixpanel.track("Friended User", { user: data.data.user });
      }

      dispatch(actions.setIsFriend(!isFriend));
    } catch (e) {
      console.log(e);
      dispatch(actions.setError(true));
    }
  }

  const set = (name) => {
    return ({ target: { value } }) => {
      dispatch(actions.updateValue(name, value));
    };
  };

  useEffect(() => {
    dispatch(actions.setError(false));
    dispatch(actions.setValues({ title: "", description: "" }));

    async function getPostData() {
      dispatch(actions.setLoading(true));
      axios.post("http://localhost:4000/posts/addView", {
        postId: props.match.params.id,
      });
      let newData = await axios.get(
        "http://localhost:4000/posts/" + props.match.params.id
      );
      let likeData = await axios.post("http://localhost:4000/posts/isLiked", {
        userId: cookies.get("userId"),
        postId: props.match.params.id,
      });
      let userData = await axios.get(
        "http://localhost:4000/users/" + cookies.get("userId")
      );
      let posterData = await axios.get(
        "http://localhost:4000/users/user/" + newData.data.user
      );

      dispatch(
        actions.setIsFriend(
          userData.data.friendList.includes(posterData.data._id)
        )
      );
      dispatch(actions.setData(newData));
      dispatch(actions.setLikes(newData.data.likes));
      dispatch(actions.setLiked(likeData.data.liked));
      dispatch(actions.setLoading(false));
    }

    getPostData();
  }, []);

  const buildCard = (comment) => {
    return (
	<div className = "full">
      <Grid item>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2">
              {comment.post}
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              {comment.description}
            </Typography>
            <Typography>Posted By: {comment.commentBy}</Typography>
          </CardContent>
        </Card>
      </Grid>
	  </div>
    );
  };

  let card = {};
  if (data && data.data && data.data.comments) {
    card = data.data.comments.map((comment) => {
      return buildCard(comment);
    });
  }

  if (loading || !data || !data.data || !data.data.comments || liked === null) {
    return (
      <div className={classes.postBody}>
        <div>Loading...</div>
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
		  <div className = "full">
            <Grid item>
              <Card variant="outlined">
			  <div className = "card">
                <CardContent>
				<div className = "title">
                  <Typography gutterBottom variant="h3" component="h2">
                    {data.data.title}
                  </Typography>
				  </div>
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
                  <Link onClick={HandleFriend}>
                    {isFriend ? "Remove Friend" : "Add Friend"}
                  </Link>
                  <Typography> {likes} Likes</Typography>
                  {liked && (
                    <FavoriteIcon
                      onClick={async (event) => {
                        event.preventDefault();
                        dispatch(actions.setLiked(false));
                        dispatch(actions.setLikes(likes - 1));
                        await axios.post("http://localhost:4000/posts/unlike", {
                          username: data.data.user,
                          userId: cookies.get("userId"),
                          postId: props.match.params.id,
                        });
                        Mixpanel.track("Unliked Post", { poster: data.data.user });
                      }}
                    ></FavoriteIcon>
                  )}
                  {!liked && (
                    <FavoriteBorderIcon
                      onClick={async (event) => {
                        event.preventDefault();
                        dispatch(actions.setLiked(true));
                        dispatch(actions.setLikes(likes + 1));
                        await axios.post("http://localhost:4000/posts/like", {
                          username: data.data.user,
                          userId: cookies.get("userId"),
                          postId: props.match.params.id,
                        });
                        Mixpanel.track("Liked Post", { poster: data.data.user });
                      }}
                    ></FavoriteBorderIcon>
                  )}
                  <Typography> {data.data.views} Views</Typography>
                </CardContent>
				</div>
              </Card>
            </Grid>
			</div>
			
            {data.data.comments && card}

			<div className = "full">
            <Grid item>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom variant="h3" component="h2">
                    Write a Comment
                  </Typography>
                  <form id="comment-form">
                    <TextField
                      value={values.title}
                      onChange={set("title")}
                      id="title"
                      label="Comment Title"
                    />
                    <br />
                    <br />
                    <br />
                    <TextField
                      multiLine
                      value={values.description}
                      onChange={set("description")}
                      id="description"
                      label="Comment"
                    />
                    <br />
                    <br />
                    <br />
                    <Button onClick={HandleSubmit}>Submit</Button>
                  </form>
                  {error && (
                    <Typography className={classes.error}>
                      There was an error submitting your Comment.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
			</div>
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default Post;
