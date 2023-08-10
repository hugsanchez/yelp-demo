import React, { useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantContext";
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from "../components/StarRatingComponent";
import Reviews from "../components/Reviews";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[])
  return (
    <div>
      {selectedRestaurant && (
        <>
          <div className="mt-3">
            <Reviews/>
          </div>
        </>
      )}
    </div>
  )
};

export default RestaurantDetailPage;