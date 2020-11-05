const mongoose = require('mongoose');
const Rest = mongoose.model('Restaurant');

const menuCreate = (req, res) => {
  const restaurantid = req.params.restaurantid;
  res.status(200).json({"message": "success"});
}

const menuReadMany = (req, res) => {
  res.status(200).json({"message": "success"});
}

const menuReadOne = (req, res) => {
  res.status(200).json({"message": "success"});
}

const menuUpdateOne = (req, res) => {
  res.status(200).json({"message": "success"});
}

const menuDeleteOne = (req, res) => {
  res.status(200).json({"message": "success"});
}

module.exports = {
  menuCreate,
  menuReadMany,
  menuReadOne,
  menuUpdateOne,
  menuDeleteOne
};