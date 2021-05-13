import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
  liquidBody: {
    height: "auto",
    marginTop: 10,
    marginLeft: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  liquidForm: {
    maxWidth: 300,
    justifyContent: "center",
  },
  error: {
    color: "red",
  },
});

const PostForm = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({ title: "", description: "", ingredients: [] });
  const [ingredientFields, setIngredientFields] = useState([]);
  const [error, setError] = useState(false);
  let history = useHistory();

  async function HandleSubmit(event) {
    try {
      console.log(values.description.trim());
      const ingredients = values.ingredients.filter(ingredient => !!ingredient.trim())
      let result = await axios.post("http://localhost:4000/posts/post", {
        userId: cookies.get("userId"),
        title: values.title.trim(),
        description: values.description.trim(),
        ingredients: ingredients
      });
      window.location.href = window.location.href.slice(0, window.location.href.length-4);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const setIngredient = (index) => {
      return ({ target: {value} }) => {
          let new_ingredients = [...values.ingredients];
          new_ingredients[index] = value;
          setValues((oldValues) => ({ ...oldValues, ingredients: new_ingredients }));
      };
  };

  const addIngredientField = () => {
    let new_ingredients = [...values.ingredients];
    new_ingredients.push("")
    setValues((oldValues) => ({ ...oldValues, ingredients: new_ingredients }));

    let new_ingredient_fields = [...ingredientFields];
    new_ingredient_fields.push(
      <TextField
        value={values.ingredients[new_ingredients.length - 1]}
        onChange={setIngredient(new_ingredients.length - 1)}
        id={`ingredient-field-${ingredientFields.length + 1}`}
        label={`Ingredient ${ingredientFields.length + 1}`}
      />)
    setIngredientFields(new_ingredient_fields);
  }

  useEffect(() => {
    addIngredientField()
  }, []);

  return (
    <div className={classes.liquidBody}>
      <Typography gutterBottom variant="h2" component="h1">
        Post a Liquid!
      </Typography>
      <Card variant="outlined" className={classes.liquidForm}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {" "}
            Liquid
          </Typography>
          <form id="liquid-form">
            <TextField
              value={values.title}
              onChange={set("title")}
              id="title"
              label="Title"
            />
            <br />
            <br />
            <br />
            <TextField
              multiline
              value={values.description}
              onChange={set("description")}
              id="description"
              label="Description"
            />
            <br />
            <br />
            <br />
            <Typography gutterBottom variant="h6" component="h4">
              Ingredients
            </Typography>
            {ingredientFields}
            <Button onClick={addIngredientField}>Add Ingredient</Button>
            <br />
            <br />
            <br />
            <Button onClick={HandleSubmit}>Submit</Button>
          </form>
          {error && (
            <Typography className={classes.error}>
              There was an error submitting your Liquid.
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostForm;