const mongoose = require('mongoose');
const Rest = mongoose.model('Restaurant');

const restaurantsListByDistance = async (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    key: 'coords',
    spherical: true,
    maxDistance: 20000,
  };

  if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
    return res.status(404).json({"message": "lng and lat query parameters are required"});
  }

  try {
    const results = await Rest.aggregate([
      {
        $geoNear: {
          near,
          ...geoOptions
        },
      },
      // {
      //   $limit: 10
      // }
    ]);
    const restaurants = results.map(result => {
      return {
        _id: result._id,
        name: result.name,
        category: result.category,
        address: result.address,
        rating: result.rating,
        image: result.image,
        distance: `${result.distance.calculated.toFixed()}`
      };
    });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(404).json(err);
  }
};
const restaurantsCreate = (req, res) => {
  Rest.create({
    name: req.body.name,
    category: req.body.category.split(","),
    address: req.body.address,
    coords: {
      type: "Point",
      coordinates: [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ]
    },
    openingTime: req.body.openingTime,
    phone: req.body.phone,
    image: req.body.image
  }, (err, restaurant) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(restaurant);
    }
  });
};
const restaurantsReadOne = (req, res) => {
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

const restaurantsUpdateOne = (req, res) => {
  if (!req.params.restaurantid) {
    return res.status(404).json({"message": "Not found, restaurantid is required"});
  }
  Rest
    .findById(req.params.restaurantid)
    .select('-reviews -menu -rating')
    .exec((err, restaurant) => {
      if (!restaurant) {
        return res.status(404).status({"message": "restaurantid not found"});
      } else if (err) {
        return res.status(400).json(err);
      }
      restaurant.name = req.body.name;
      restaurant.category = req.body.category;
      restaurant.image = req.body.image;
      restaurant.address = req.body.address;
      restaurant.coords = {
        type: "Point",
        coordinates: [
          parseFloat(req.body.lng),
          parseFloat(req.body.lat)
        ]
      };
      restaurant.openingTime = req.body.openingTime;
      restaurant.phone = req.body.phone;
      restaurant.save((err, rest) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rest);
        }
      });
    });
};
const restaurantsDeleteOne = (req, res) => {
  const { restaurantid } = req.params;
  if (restaurantid) {
    Rest
      .findByIdAndDelete(restaurantid)
      .exec((err, restaurant) => {
        if (err) {
          return res.status(404).json(err);
        }
        res.status(204).json(null);
      });
  } else {
    res.status(404).json({"message": "No Restaurant"});
  }
}; 
module.exports = {
  restaurantsListByDistance,
  restaurantsCreate,
  restaurantsReadOne,
  restaurantsUpdateOne,
  restaurantsDeleteOne
};