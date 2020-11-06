const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

const restaurantCategory = (req, res) => {
  const path = '/api/home';
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
    renderRestaurantCategoryPage(req, res, body);
  })
}

const renderRestaurantCategoryPage = (req, res, responseBody) => {
  res.render('home', {
    restaurants: responseBody
  });
};

module.exports = {
    restaurantCategory
  };