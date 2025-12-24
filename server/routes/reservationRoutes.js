const express = require('express');
const router = express.Router();
const {
    createReservation,
    getRestaurantReservations,
    updateReservationStatus
} = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(createReservation); // Public access for booking

router.route('/:id')
    .patch(protect, updateReservationStatus); // Protected Update

router.route('/restaurant/:id')
    .get(protect, getRestaurantReservations); // Protected access for owners

module.exports = router;
