const mongoose = require('mongoose');
const Rest = mongoose.model('Restaurant');
 
 

const restaurantsCategory = async (req, res) => {
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

  if (!lng || !lat) {
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
        category: result.category, 
        image: result.image, 
      };
    });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { 
  restaurantsCategory
};