const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const ctrlRestaurants = require('../controllers/restaurants');
const categoryRestaurants = require('../controllers/home');

/* GET home page. */

router.get('/home', categoryRestaurants.restaurantCategory);

router.get('/', ctrlRestaurants.restaurantList);

//router.get('/restraunt', controllers.restrauntInfo);

module.exports = router;
