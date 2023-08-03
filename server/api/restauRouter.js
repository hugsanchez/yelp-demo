const express = require("express");
const router  = express.Router();
const db = require('../db');

router.get("/", async(req,res) => {
  try{
    const results = await db.query("SELECT * FROM restaurants");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows
      },
    });
  } catch(err){
    console.log(err);
  }
});


router.get("/:id", async(req,res) => {
  try{
    const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant : results.rows[0]
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

module.exports = router;