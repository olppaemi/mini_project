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

const showError = (req, res, status) => {
  let title = `${status}error`;
  let content = '';

  if (status === 404) {
    content = '죄송합니다.\n요청하신 페이지를 찾을 수 없습니다.';
  } else {
    content = '죄송합니다.\n잘못된 응답을 전송했습니다.';
  }
  res.status(status);
  res.render('error-text', {
    title,
    content
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
  request(requestOptions, (err, {statusCode}, body) => {
    const restaurant = body;
    if (statusCode === 200) {
      restaurant.coords = {
        lng: body.coords.coordinates[0],
        lat: body.coords.coordinates[1]
      };
      renderRestaurantInfo(req, res, restaurant);
    } else {
      showError(req, res, statusCode);
    }
  });
};

const addReview = (req, res) => {
  const restaurantid = req.params.restaurantid;
  const path = `/api/restaurants/${restaurantid}/reviews`;
  const postdata = {
    author: req.body.author,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.reviewText
  };
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  request(requestOptions, (err, {statusCode}, body) => {
    if (statusCode === 201) {
      res.redirect(`/${restaurantid}`);
    } else {
      showError(req, res, statusCode);
    }
  });
};
 
module.exports = {
  restaurantList,
  restaurantInfo,
  addReview
};