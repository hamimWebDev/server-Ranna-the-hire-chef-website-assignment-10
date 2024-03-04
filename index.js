const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const country = require("./data/country.json");
const chef = require("./data/chef.json");
const recipes = require("./data/recipes.json");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Dragon is running");
});

app.get("/country", (req, res) => {
  res.send(country);
});

app.get("/chef", (req, res) => {
  res.send(chef);
});

app.get("/chef/:id", (req, res) => {
  const id = req.params.id;
  const selectedChef = chef.find((n) => n.id === id);
  const chefRecipes = recipes.filter((n) =>n.food_id === id)
  res.send([selectedChef, [
    ...chefRecipes
  ]]);
});

app.get("/country/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id === 0) {
    res.send(chef);
  } else {
    const categoryChef = chef.filter((n) => parseInt(n.category_id) === id);
    res.send(categoryChef);
  }
});

app.listen(port, () => {
  console.log(`Dragon API is running on port: ${port}`);
});
