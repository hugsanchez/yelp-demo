const express = require("express");
const router  = express.Router();
const db = require('../db');

router.get("/", async(req,res) => {
  try{
    const restaurantRatingData = await db.query("SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");


    res.status(200).json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows
      },
    });
  } catch(err){
    console.log(err);
  }
});


router.get("/:id", async(req,res) => {
  try{
    const restaurant = await db.query("SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;", [req.params.id]);

    const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant : restaurant.rows[0],
        reviews: reviews.rows
      }
    });
  } catch(err){
    console.log(err);
  }
});


router.post("/", async(req,res) => {
  try{
    const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *",
    [req.body.name, req.body.location, req.body.price_range]);

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    })
  }catch(err){
    console.log(err);
  }
});

router.put("/:id", async(req,res) => {
  try{
    const results = await db.query("UPDATE restaurants SET name = $1, location=$2, price_range=$3 where id=$4 returning *", 
      [req.body.name, req.body.location, req.body.price_range, req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      }
    })
  }catch(err){
    console.log(err);
  }
});

router.delete("/:id", async(req, res) => {
  try{
    const results = await db.query("DELETE FROM restaurants WHERE id =$1", [req.params.id]);

    res.status(204).json({
      status: "success"
    });
  }catch(err){
    console.log(err);
  }
});

router.post("/:id/addReview", async(req,res) => {
  try{
    const results = await db.query("INSERT INTO reviews (restaurant_id, name, body, rating) values ($1, $2, $3, $4) returning *", 
    [req.params.id, req.body.name, req.body.body, req.body.rating]);

    res.status(201).json({
      status: "success",
      data: {
        review: results.rows[0],
      }
    });
  }catch(err){
    console.log(err);
  }
});

module.exports = router;