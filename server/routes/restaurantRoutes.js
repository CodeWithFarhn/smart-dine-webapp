const express = require('express');
const router = express.Router();
const {
    registerRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant
} = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getRestaurants)
    .post(protect, registerRestaurant); // Only authenticated users (owners) can register

router.route('/:id')
    .get(getRestaurantById)
    .put(protect, updateRestaurant);

module.exports = router;
