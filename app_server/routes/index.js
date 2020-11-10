const express = require('express');
const router = express.Router();
// const controllers = require('../controllers');
const ctrlHome = require('../controllers/home');
const ctrlRestaurants = require('../controllers/restaurants');

router.get('/', ctrlHome.categoryList);
// router.get('/restaurants', ctrlRestaurants.restaurantList);
router.get('/restaurants/:category?', ctrlRestaurants.restaurantList);
router.get('/:restaurantid', ctrlRestaurants.restaurantInfo);

 
module.exports = router;
