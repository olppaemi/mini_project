const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

const restaurantList = (req, res) => {
  const path = '/api/restaurants';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    qs: {
      lng: 126.9800,
      lat: 37.5700,
      maxDistance: 20
    }
  };
  request(requestOptions, (err, response, body) => {
    renderRestaurantListPage(req, res, body);
  })
}

const renderRestaurantListPage = (req, res, responseBody) => {
  res.render('restaurant-list', {
    restaurants: responseBody
  });
};

module.exports = {
  restaurantList
};