const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public (or Protected if logged in user)
const createReservation = async (req, res) => {
    try {
        const {
            restaurantId,
            customerName,
            customerEmail,
            customerPhone,
            date,
            time,
            partySize,
            specialRequests
        } = req.body;

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Basic validation (can be expanded to check table availability)
        const reservation = await Reservation.create({
            restaurant: restaurantId,
            user: req.user ? req.user._id : null, // Optional link to user account
            customerName,
            customerEmail,
            customerPhone,
            date,
            time,
            partySize,
            specialRequests
        });

        res.status(201).json(reservation);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all reservations for a specific restaurant
// @route   GET /api/reservations/restaurant/:id
// @access  Private (Owner/Admin)
const getRestaurantReservations = async (req, res) => {
    try {
        // Ensure the user owns the restaurant
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Basic authorization check: User must be the owner
        if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to view these reservations' });
        }

        const reservations = await Reservation.find({ restaurant: req.params.id })
            .sort({ date: 1, time: 1 }); // Sort by date/time ascending

        res.json(reservations);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createReservation,
    getRestaurantReservations
};
