import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location,setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async() => {
       const response = await RestaurantFinder.get(`/${id}`);
       const { name, location, price_range } = response.data.data.restaurant;
       setName(name);
       setLocation(location);
       setPriceRange(price_range);
    };
    fetchData();
  },[]);

  return(
    <div>
      <h1>{name}</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text"/>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} id='location' type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="priceRange">Price Range</label>
          <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="priceRange" className="form-control" type="number"/>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
};

export default UpdateRestaurant;