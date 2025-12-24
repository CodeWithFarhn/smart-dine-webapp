const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

// @desc    Register a new restaurant
// @route   POST /api/restaurants
// @access  Private (Owner)
const registerRestaurant = async (req, res) => {
    try {
        const {
            name,
            cuisineType,
            priceRange,
            description,
            address,
            phone,
            email,
            operatingHours
        } = req.body;

        const restaurantExists = await Restaurant.findOne({ email });

        if (restaurantExists) {
            return res.status(400).json({ message: 'Restaurant using this email already exists' });
        }

        const restaurant = await Restaurant.create({
            owner: req.user._id,
            name,
            cuisineType,
            priceRange,
            description,
            address,
            phone,
            email,
            operatingHours
        });

        if (restaurant) {
            res.status(201).json(restaurant);
        } else {
            res.status(400).json({ message: 'Invalid restaurant data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update restaurant details (settings, hours, etc.)
// @route   PUT /api/restaurants/:id
// @access  Private (Owner)
const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Verify ownership
        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update fields if present in body
        restaurant.name = req.body.name || restaurant.name;
        restaurant.description = req.body.description || restaurant.description;
        restaurant.phone = req.body.phone || restaurant.phone;
        restaurant.operatingHours = req.body.operatingHours || restaurant.operatingHours;
        restaurant.bookingSettings = req.body.bookingSettings || restaurant.bookingSettings;
        restaurant.blackoutDates = req.body.blackoutDates || restaurant.blackoutDates;

        const updatedRestaurant = await restaurant.save();
        res.json(updatedRestaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant
};
