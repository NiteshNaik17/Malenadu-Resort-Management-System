const mongoose = require('mongoose');
const Room = require('./models/Room');
const User = require('./models/User');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_reservation');

        // Clear existing data
        await Room.deleteMany({});
        await User.deleteMany({});

        // Add Admin
        const admin = new User({
            name: 'Admin User',
            email: 'admin@hotel.com',
            password: 'admin@123', // User-defined simple password
            role: 'admin'
        });
        await admin.save();

        // Generate 10 rooms of each type programmatically
        const types = [
            { type: 'Single', price: 100 },
            { type: 'Double', price: 180 },
            { type: 'Suite', price: 350 },
            { type: 'Deluxe', price: 500 }
        ];
        
        const rooms = [];
        let roomCount = 1;
        
        types.forEach((t, index) => {
            for(let i = 1; i <= 10; i++) {
                rooms.push({
                    roomNumber: `${(index + 1) * 100 + i}`, // e.g., 101-110, 201-210...
                    roomType: t.type,
                    price: t.price + (i * 5), // Slight variation in price
                    status: 'available'
                });
            }
        });
        
        await Room.insertMany(rooms);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
