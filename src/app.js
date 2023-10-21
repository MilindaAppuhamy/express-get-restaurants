const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
  const newRestaurant = await Restaurant.create({
    name: req.body.name,
    location: req.body.location,
    cuisine: req.body.cuisine,
  });
  res.json(newRestaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  const updatedRestuarant = await restaurant.update({
    name: req.body.name,
    location: req.body.location,
    cuisine: req.body.cuisine,
  });
  res.json(updatedRestuarant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  const deletedRestuarant = await restaurant.destroy();
  res.json(deletedRestuarant);
});

module.exports = app;
