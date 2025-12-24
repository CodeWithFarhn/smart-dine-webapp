const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    name: {
        type: String,
        required: true // e.g., "T-1", "Table 5"
    },
    capacity: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        default: 'Main Dining' // e.g., "Patio", "Bar"
    },
    type: {
        type: String,
        enum: ['Standard', 'Booth', 'High Top', 'Outdoor'],
        default: 'Standard'
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Reserved', 'Maintenance'],
        default: 'Available'
    },
    // For visual layout
    position: {
        x: Number,
        y: Number
    }
}, {
    timestamps: true
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
