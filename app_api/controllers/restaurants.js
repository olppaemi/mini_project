const mongoose = require('mongoose');
const Rest = mongoose.model('Restaurant');

const restaurantsListByDistance = (req, res) => {
  res.status(200).json({"status": "success"});
};
const restaurantsCreate = (req, res) => {
  res.status(200).json({"status": "success"});
};
const restaurantsRead = (req, res) => {
  Rest
    .findById(req.params.restaurantid)
    .exec((err, restaurant) => {
      if (!restaurant) {
        return res.status(404).json({"message": "restaurant not found"});
      } else if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(restaurant);
    });
};
const restaurantsUpdate = (req, res) => {
  res.status(200).json({"status": "success"});
};
const restaurantsDelete = (req, res) => {
  res.status(200).json({"status": "success"});
};

module.exports = {
  restaurantsListByDistance,
  restaurantsCreate,
  restaurantsRead,
  restaurantsUpdate,
  restaurantsDelete
};