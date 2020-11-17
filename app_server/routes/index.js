const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/home');
const ctrlRestaurants = require('../controllers/restaurants');

router.get('/', ctrlHome.categoryList);
router.get('/restaurants/:category?', ctrlRestaurants.restaurantList);
router
  .route('/:restaurantid')
  .get(ctrlRestaurants.restaurantInfo)
  .post(ctrlRestaurants.addReview);
 
module.exports = router;
