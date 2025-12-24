const Table = require('../models/Table');
const Restaurant = require('../models/Restaurant');

// @desc    Add a new table
// @route   POST /api/tables
// @access  Private (Owner)
const addTable = async (req, res) => {
    try {
        const { number, capacity, type, section, restaurantId } = req.body;

        // Verify ownership
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const table = await Table.create({
            restaurant: restaurantId,
            name: `Table ${number}`, // Using name as "Table X" based on number
            capacity,
            type,
            section,
            position: { x: 0, y: 0 }, // Default position
            status: 'Available'
        });

        res.status(201).json(table);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all tables for a restaurant
// @route   GET /api/tables/restaurant/:restaurantId
// @access  Public (or Private)
const getTables = async (req, res) => {
    try {
        const tables = await Table.find({ restaurant: req.params.restaurantId });
        res.json(tables);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a table
// @route   DELETE /api/tables/:id
// @access  Private (Owner)
const deleteTable = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);

        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        // Verify ownership
        const restaurant = await Restaurant.findById(table.restaurant);
        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await table.deleteOne();
        res.json({ message: 'Table removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    addTable,
    getTables,
    deleteTable
};
