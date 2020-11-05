const mongoose = require('mongoose');
const Rest = mongoose.model('Restaurant');

const setAverageRating = (restaurant) => {
  if (restaurant.reviews && restaurant.reviews.length > 0) {
    const count = restaurant.reviews.length;
    const total = restaurant.reviews.reduce((acc, {rating}) => {
      return acc + rating;
    }, 0);
    restaurant.rating = parseFloat(total / count);
    restaurant.save(err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Average rating updated to ${restaurant.rating}`);
      }
    });
  }
};

const updateAverageRating = (restaurantId) => {
  Rest.findById(restaurantId)
    .select('rating reviews')
    .exec((err, restaurant) => {
      if (!err) {
        setAverageRating(restaurant);
      }
    });
};

const addReview = (req, res, restaurant) => {
  if (!restaurant) {
    res.status(404).json({"message": "Restaurant not found"});
  } else {
    const { author, rating, reviewText } = req.body;
    restaurant.reviews.push({
      author,
      rating,
      reviewText
    });
    restaurant.save((err, restaurant) => {
      if (err) {
        res.status(400).json(err);
      } else {
        updateAverageRating(restaurant._id);
        const newReview = restaurant.reviews.slice(-1).pop();
        res.status(201).json(newReview);
      }
    });
  }
};

const reviewsCreate = (req, res) => {
  const restaurantId = req.params.restaurantid;
  if (restaurantId) {
    Rest
      .findById(restaurantId)
      .select('reviews')
      .exec((err, restaurant) => {
        if (err) {
          res.status(400).json(err);
        } else {
          addReview(req, res, restaurant);
        }
      })
  } else {
    res.status(404).json({ "message": "Restaurant not found" });
  }
};

const reviewsReadMany = (req, res) => {
  Rest
    .findById(req.params.restaurantid)
    .select('name reviews')
    .exec((err, restaurant) => {
      if (!restaurant) {
        return res.status(404).json({"message": "restaurant not found"});
      } else if (err) {
        return res.status(400).json(err);
      }
      
      const response = {
        restaurant: {
          name: restaurant.name,
          id: req.params.restaurantid
        },
        reviews: restaurant.reviews
      }
      return res.status(200).json(response);
    });
};

const reviewsReadOne = (req, res) => {
  Rest
    .findById(req.params.restaurantid)
    .select('name reviews')
    .exec((err, restaurant) => {
      if (!restaurant) {
        return res.status(404).json({"message": "restaurant not found"});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      if (restaurant.reviews && restaurant.reviews.length > 0) {
        const review = restaurant.reviews.id(req.params.reviewid);
        if (!review) {
          return res.status(404).json({"message": "review not found"});
        } else {
          const response = {
            restaurant: {
              name: restaurant.name,
              id: req.params.restaurantid
            },
            review
          };
          return res.status(200).json(response);
        }
      } else {
        return res.status(404).json({"message": "No reviews found"});
      }      
    });
};

const reviewsUpdateOne = (req, res) => {
  const { restaurantid, reviewid } = req.params;
  if (!restaurantid || !reviewid) {
    return res.status(404).json({ "message": "Not found, restaurantid and reviewid are both required"});
  }
  Rest
    .findById(restaurantid)
    .select('reviews')
    .exec((err, restaurant) => {
      if (!restaurant) {
        return res.status(404).json({"message": "Restaurant not found"});
      } else if (err) {
        return res.status(400).json(err);
      }
      if (restaurant.reviews && restaurant.reviews.length > 0) {
        const thisReview = restaurant.reviews.id(reviewid);
        if (!thisReview) {
          res.status(404).json({"message": "Review not found"});
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          restaurant.save((err, rest) => {
            if (err) {
              res.status(404).json(err);
            } else {
              updateAverageRating(rest._id);
              res.status(200).json(thisReview);
            }
          })
        }
      } else {
        res.status(404).json({"message": "No review to update"});
      }
    })
};

const reviewsDeleteOne = (req, res) => {
  const { restaurantid, reviewid } = req.params;
  if (!restaurantid || !reviewid) {
    return res.status(404).json({"message": "Not found, restaurantid and reviewid are both required"});
  }

  Rest
    .findById(restaurantid)
    .select('reviews')
    .exec((err, restaurant) => {
      if (!restaurant) {
        return res.status(404).json({"message": "Restaurant not found"});
      } else if (err) {
        return res.status(400).json(err);
      }

      if (restaurant.reviews && restaurant.reviews > 0) {
        if (!restaurant.reviews.id(reviewid)) {
          return res.status(404).json({"message": "Review not found"});
        } else {
          restaurant.reviews.id(reviewid).remove();
          restaurant.save(err => {
            if (err) {
              return res.status(404).json(err);
            }
            updateAverageRating(restaurant._id);
            res.status(204).json(null);
          });
        }
      } else {
        res.status(404).json({"message": "No Review to delete"});
      }
    });
};

module.exports = {
  reviewsCreate,
  reviewsReadMany,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};