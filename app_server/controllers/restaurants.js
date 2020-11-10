const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';
  if (distance > 1000) {
    unit = 'km';
    thisDistance = parseFloat(distance / 1000).toFixed(1);
  } else {
    thisDistance = distance;
  }
  return thisDistance + unit;
};

const restaurantList = (req, res) => {  
  const path = '/api/restaurants';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    qs: {
      lng: 126.882044,
      lat: 37.47888,
      maxDistance: 3
    }
  };
  const category = req.params.category;
  
  request(requestOptions, (err, {statusCode}, body) => {
    let restaurants = body;
    if (statusCode === 200 && restaurants.length) {
      if (category) {        
        restaurants = restaurants.filter((restaurant) => {
          return restaurant.category.includes(category)
        })
      }

      restaurants = restaurants.map((item) => {
        item.distance = formatDistance(item.distance);
        return item;
      });      
    }
    renderRestaurantListPage(req, res, restaurants);
  });
}

const renderRestaurantListPage = (req, res, restaurants) => {
  let message = null;
  if (!(restaurants instanceof Array)) {
    message = "API error";
  } else {
    if (!restaurants.length) {
      message = "주변에 위치한 음식점이 없습니다.";
    }
  }
  res.render('restaurant-list', {
    restaurants,
    message
  });
};

const renderRestaurantInfo = (req, res, restaurant) => {
  res.render('restaurant-info', {
    restaurant
  });
};

const restaurantInfo = (req, res) => {
  const path = `/api/restaurants/${req.params.restaurantid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(requestOptions, (err, response, body) => {
    const restaurant = body; 
    restaurant.coords = {
      lng: body.coords[0],
      lat: body.coords[1]
    };
    renderRestaurantInfo(req, res, restaurant);
  });
};
 
module.exports = {
  restaurantList,
  restaurantInfo 
};