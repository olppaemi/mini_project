const mongoose = require('mongoose');
const Rest = mongoose.model('Restaurant');

const menuCreate = (req, res) => {
  const restaurantid = req.params.restaurantid;
  Rest
    .findById(restaurantid)
    .select('menu')
    .exec((err, restaurant) => {
      if (!restaurant) {
        return res.status(404).json({"message": "Restaurant not found"})
      } else if (err) {
        res.status(400).json(err);
      }
      const { name, price, description, image } = req.body;
      restaurant.menu.push({
        name,
        price,
        description,
        image
      });
      restaurant.save((err, rest) => {
        if (err) {
          res.status(400).json(err);
        } else {
          const newFood = restaurant.menu.slice(-1).pop();
          res.status(201).json(newFood);
        }
      });
    });
};

const menuReadMany = (req, res) => {
  Rest
    .findById(req.params.restaurantid)
    .select('name menu')
    .exec((err, restaurant) => {
      if (!restaurant) {
        return res.status(404).json({"message": "Restaurant not found"});
      } else if (err) {
        return res.status(400).json(err);
      }
      const response = {
        restaurant: {
          name: restaurant.name,
          id: req.params.restaurantid
        },
        menu: restaurant.menu
      }
      return res.status(200).json(response);
    });
};

const menuReadOne = (req, res) => {
  // Rest
  //   .findById(req.params.restaurantid)
  //   .select('name menu')
  //   .exec((err, restaurant) => {
  //     if (!restaurant) {
  //       return res.status(404).json({"message": "Restaurant not found"});
  //     } else if (err) {
  //       return res.status(400).json(err);
  //     }
  //     if (restaurant.menu && restaurant.menu.length > 0) {
  //       const food = restaurant.menu.id()
  //     }
  //   })
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