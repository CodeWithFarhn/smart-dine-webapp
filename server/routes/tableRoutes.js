const express = require('express');
const router = express.Router();
const { addTable, getTables, updateTable, deleteTable } = require('../controllers/tableController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addTable);

router.route('/restaurant/:restaurantId')
    .get(getTables); // Can be public for booking selection

router.route('/:id')
    .put(protect, updateTable)
    .delete(protect, deleteTable);

module.exports = router;
