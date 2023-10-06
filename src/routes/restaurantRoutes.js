import express from 'express';
import { getLikeRestaurant, getLikeRestaurantByUser, likeRes, rateRes, getRateRes, getRateResByUser } from '../controllers/restaurantController.js'

const restaurantRoute = express.Router();

restaurantRoute.get("/like-res/:resId", getLikeRestaurant)
restaurantRoute.get("/like-res-by-user/:userId", getLikeRestaurantByUser)
restaurantRoute.post("/like/:userId", likeRes)
restaurantRoute.post("/rate/:userId", rateRes)
restaurantRoute.get("/rate-res/:resId", getRateRes)
restaurantRoute.get("/rate-res-by-user/:userId", getRateResByUser)

export default restaurantRoute;