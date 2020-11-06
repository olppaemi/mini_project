const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const ctrlRestaurants = require('../controllers/restaurants');

/* GET home page. */
router.get('/', ctrlRestaurants.restaurantList);

// router.get('/restraunt', controllers.restrauntInfo);


/*router.get('/', function(req, res, next) {
    res.render('home');
});*/


module.exports = router;
