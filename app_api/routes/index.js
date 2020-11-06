const express = require('express');
const router = express.Router();
const ctrlRestaurants = require('../controllers/restaurants');
const ctrlReviews = require('../controllers/reviews');
const ctrlMenu = require('../controllers/menu');
const ctrlHome = require('../controllers/home');

// home
router
  .route('/home')
  .get(ctrlHome.restaurantsCategory) 

// restaurants
router
  .route('/restaurants')
  .get(ctrlRestaurants.restaurantsListByDistance)
  .post(ctrlRestaurants.restaurantsCreate);
router
  .route('/restaurants/:restaurantid')
  .get(ctrlRestaurants.restaurantsReadOne)
  .put(ctrlRestaurants.restaurantsUpdateOne)
  .delete(ctrlRestaurants.restaurantsDeleteOne);

// reviews
router
  .route('/restaurants/:restaurantid/reviews')
  .get(ctrlReviews.reviewsReadMany)
  .post(ctrlReviews.reviewsCreate);
router
  .route('/restaurants/:restaurantid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);


// menu
router
  .route('/restaurants/:restaurantid/menu')
  .get(ctrlMenu.menuReadMany)
  .post(ctrlMenu.menuCreate)
router
  .route('/restaurants/:restaurantid/menu/:foodname')
  .get(ctrlMenu.menuReadOne)
  .put(ctrlMenu.menuUpdateOne)
  .delete(ctrlMenu.menuDeleteOne);

module.exports = router;