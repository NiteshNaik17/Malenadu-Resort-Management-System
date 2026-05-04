const mongoose = require('mongoose');
const Package = require('./models/Package');
require('dotenv').config();

const packages = [
    {
        name: 'Family Getaway Package',
        description: 'Perfect for families! Includes 2 interconnected rooms, breakfast, and access to the kids park.',
        price: 250,
        duration: '2 Days, 1 Night',
        features: ['2 Deluxe Rooms', 'Free Breakfast', 'Kids Club Access', 'Pool Entry'],
        imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Romantic Weekend Package',
        description: 'Escape with your partner. Includes candlelit dinner, spa vouchers, and late checkout.',
        price: 350,
        duration: '3 Days, 2 Nights',
        features: ['Premium Suite', 'Candlelit Dinner', 'Spa Treatment', 'Late Checkout'],
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Adventure Lovers Package',
        description: 'For the thrill-seekers! Includes trekking, campfire, and guided forest tours.',
        price: 180,
        duration: '2 Days, 1 Night',
        features: ['Standard Room', 'Guided Trekking', 'Campfire Night', 'Buffet Dinner'],
        imageUrl: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Business Retreat Package',
        description: 'Efficient and comfortable. High-speed Wi-Fi, conference room access, and laundry service.',
        price: 150,
        duration: '1 Day, 1 Night',
        features: ['Executive Room', 'Conference Access', 'High-speed Wi-Fi', 'Airport Pickup'],
        imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Nature Immersive Package',
        description: 'Unplug and reconnect. bird watching, meditation sessions, and organic farm meals.',
        price: 220,
        duration: '3 Days, 2 Nights',
        features: ['Eco Cottage', 'Bird Watching', 'Meditation Class', 'Organic Meals'],
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
];

async function seedPackages() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_reservation');
        console.log('Connected to MongoDB');

        await Package.deleteMany({});
        console.log('Existing packages removed');

        await Package.insertMany(packages);
        console.log('5 Packages seeded successfully');

        process.exit();
    } catch (err) {
        console.error('Error seeding packages:', err);
        process.exit(1);
    }
}

seedPackages();
