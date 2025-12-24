const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    cuisineType: {
        type: String,
        required: true
    },
    priceRange: {
        type: String,
        enum: ['$', '$$', '$$$', '$$$$'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    operatingHours: {
        type: mongoose.Schema.Types.Mixed, // Storing the complex schedule array directly
        default: []
    },
    blackoutDates: [{
        date: String,
        reason: String
    }],
    bookingSettings: {
        minPartySize: { type: Number, default: 1 },
        maxPartySize: { type: Number, default: 10 },
        reservationDuration: { type: Number, default: 90 },
        minAdvanceBooking: { type: Number, default: 15 },
        maxAdvanceBooking: { type: Number, default: 90 },
        allowExactFit: { type: Boolean, default: true },
        allowOverCapacity: { type: Boolean, default: false },
        overCapacityThreshold: { type: Number, default: 0 },
        allowPartialBooking: { type: Boolean, default: false },
        orphanSeatThreshold: { type: Number, default: 0 },
        peakHourStart: { type: String, default: "18:00" },
        peakHourEnd: { type: String, default: "21:00" },
        allowWalkIns: { type: Boolean, default: true },
        phoneConfirmationRequired: { type: Boolean, default: false }
    },
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
