const express = require('express');
const router = express.Router();
const ctrlRestaurants = require('../controllers/restaurants');
const ctrlReviews = require('../controllers/reviews');

// restaurants
router
  .route('/restaurants')
  .get(ctrlRestaurants.restaurantsListByDistance)
  .post(ctrlRestaurants.restaurantsCreate);
router
  .route('/restaurants/:restaurantid')
  .get(ctrlRestaurants.restaurantsRead)
  .put(ctrlRestaurants.restaurantsUpdate)
  .delete(ctrlRestaurants.restaurantsDelete);

// reviews
router
  .route('/restaurants/:restaurantid/reviews')
  .post(ctrlReviews.reviewsCreate);
router
  .route('/restaurants/:restaurantid/reviews/:reviewid')
  .get(ctrlReviews.reviewsRead)
  .put(ctrlReviews.reviewsUpdate)
  .delete(ctrlReviews.reviewsDelete);

module.exports = router;