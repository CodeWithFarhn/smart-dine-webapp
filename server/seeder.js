const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional: for colored console output
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Table = require('./models/Table');
const Reservation = require('./models/Reservation');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Reservation.deleteMany();
        await Table.deleteMany();
        await Restaurant.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed...'.red.inverse);

        // 1. Create Users
        const createdUsers = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin',
            },
            {
                name: 'John Doe',
                email: 'customer@example.com',
                password: 'password123',
                role: 'customer',
            },
            {
                name: 'Mario Rossi',
                email: 'owner@italian.com',
                password: 'password123',
                role: 'owner',
            },
            {
                name: 'Sakura Tanaka',
                email: 'owner@japanese.com',
                password: 'password123',
                role: 'owner',
            }
        ]);

        const adminUser = createdUsers[0]._id;
        const ownerItalian = createdUsers[2]._id;
        const ownerJapanese = createdUsers[3]._id;

        console.log('Users Imported...'.green.inverse);

        // 2. Create Restaurants
        const sampleRestaurants = [
            {
                owner: ownerItalian,
                name: 'Bella Italia Trattoria',
                cuisineType: 'Italian',
                priceRange: '$$',
                description: 'Authentic Italian dining experience with homemade pasta and wood-fired pizzas.',
                address: {
                    street: '123 Olive Way',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001'
                },
                phone: '212-555-0199',
                email: 'info@bellaitalia.com',
                operatingHours: {
                    monFri: '11:00 AM - 10:00 PM',
                    sat: '12:00 PM - 11:00 PM',
                    sun: '12:00 PM - 9:00 PM'
                }
            },
            {
                owner: ownerJapanese,
                name: 'Sakura Sushi Bar',
                cuisineType: 'Japanese',
                priceRange: '$$$',
                description: 'Premium sushi and sashimi using the freshest fish flown in daily from Tokyo.',
                address: {
                    street: '456 Cherry Blossom Blvd',
                    city: 'San Francisco',
                    state: 'CA',
                    zipCode: '94102'
                },
                phone: '415-555-0288',
                email: 'contact@sakurasushi.com',
                operatingHours: {
                    monFri: '5:00 PM - 10:00 PM',
                    sat: '5:00 PM - 11:00 PM',
                    sun: 'Closed'
                }
            },
            {
                owner: ownerItalian,
                name: 'The Rustic Burger',
                cuisineType: 'American',
                priceRange: '$$',
                description: 'Gourmet burgers and craft beers in a cozy, rustic setting.',
                address: {
                    street: '789 Market St',
                    city: 'Austin',
                    state: 'TX',
                    zipCode: '73301'
                },
                phone: '512-555-0377',
                email: 'hello@rusticburger.com',
                operatingHours: {
                    monFri: '11:00 AM - 11:00 PM',
                    sat: '11:00 AM - 12:00 AM',
                    sun: '11:00 AM - 10:00 PM'
                }
            }
        ];

        const createdRestaurants = await Restaurant.insertMany(sampleRestaurants);
        console.log('Restaurants Imported...'.green.inverse);

        // 3. Create Tables (for Bella Italia)
        const italianRestId = createdRestaurants[0]._id;

        const sampleTables = [
            { restaurant: italianRestId, name: 'T1', capacity: 2, section: 'Main Dining', type: 'Standard', status: 'Available' },
            { restaurant: italianRestId, name: 'T2', capacity: 2, section: 'Main Dining', type: 'Standard', status: 'Occupied' },
            { restaurant: italianRestId, name: 'T3', capacity: 4, section: 'Main Dining', type: 'Booth', status: 'Available' },
            { restaurant: italianRestId, name: 'T4', capacity: 4, section: 'Main Dining', type: 'Booth', status: 'Reserved' },
            { restaurant: italianRestId, name: 'T5', capacity: 6, section: 'Patio', type: 'Outdoor', status: 'Available' },
            { restaurant: italianRestId, name: 'Bar-1', capacity: 1, section: 'Bar', type: 'High Top', status: 'Available' },
            { restaurant: italianRestId, name: 'Bar-2', capacity: 1, section: 'Bar', type: 'High Top', status: 'Available' }
        ];

        await Table.insertMany(sampleTables);
        console.log('Tables Imported for Bella Italia...'.green.inverse);

        console.log('Data Imported!'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Reservation.deleteMany();
        await Table.deleteMany();
        await Restaurant.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
