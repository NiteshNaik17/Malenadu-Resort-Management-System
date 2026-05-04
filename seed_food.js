const mongoose = require('mongoose');
const FoodItem = require('./models/FoodItem');
require('dotenv').config();

const foodItems = [
    // Veg Items (10)
    {
        name: 'Paneer Tikka',
        description: 'Cubes of paneer marinated in spices and grilled in a tandoor.',
        price: 12,
        category: 'Dinner',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Vegetable Biryani',
        description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices.',
        price: 10,
        category: 'Lunch',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Masala Dosa',
        description: 'Crispy rice pancake filled with spiced potato mash, served with sambar and chutney.',
        price: 8,
        category: 'Breakfast',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1630383249896-db9316d94da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Dal Makhani',
        description: 'Slow-cooked black lentils and kidney beans with butter and cream.',
        price: 9,
        category: 'Dinner',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Butter Garlic Naan',
        description: 'Soft leavened flatbread topped with butter and minced garlic.',
        price: 4,
        category: 'Dinner',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1601050638917-3f30f1427116?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Palak Paneer',
        description: 'Soft paneer cubes in a thick paste made from pureed spinach.',
        price: 11,
        category: 'Dinner',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Aloo Gobi',
        description: 'Traditional Indian dish made with potatoes, cauliflower, and Indian spices.',
        price: 9,
        category: 'Lunch',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Chana Masala',
        description: 'Chickpeas simmered in a spicy and tangy tomato-based gravy.',
        price: 8,
        category: 'Dinner',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Vegetable Spring Rolls',
        description: 'Crispy deep-fried rolls filled with sautéed vegetables.',
        price: 7,
        category: 'Breakfast',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Greek Salad',
        description: 'Fresh cucumber, tomato, onion, olives, and feta cheese with olive oil dressing.',
        price: 9,
        category: 'Lunch',
        foodType: 'Veg',
        imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },

    // Non-Veg Items (10)
    {
        name: 'Butter Chicken',
        description: 'Tender chicken pieces cooked in a rich, creamy tomato-based gravy.',
        price: 15,
        category: 'Dinner',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1603894584202-9cb8f4381999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Mutton Rogan Josh',
        description: 'Slow-cooked mutton in a spicy gravy flavored with Kashmiri red chilies.',
        price: 18,
        category: 'Dinner',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Fish Curry',
        description: 'Fresh fish cooked in a tangy coconut-based gravy with traditional spices.',
        price: 16,
        category: 'Lunch',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1589187151003-0dd3c63d47e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Chicken Biryani',
        description: 'Layered basmati rice and marinated chicken cooked with saffron and spices.',
        price: 14,
        category: 'Lunch',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Tandoori Chicken',
        description: 'Roasted chicken marinated in yogurt and spices, cooked in a cylindrical clay oven.',
        price: 13,
        category: 'Dinner',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Prawn Masala',
        description: 'Juicy prawns cooked in a spicy tomato and onion gravy.',
        price: 19,
        category: 'Dinner',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Chicken Tikka',
        description: 'Boneless chicken pieces marinated in spices and yogurt, grilled to perfection.',
        price: 12,
        category: 'Dinner',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Lamb Chops',
        description: 'Tender lamb chops marinated in herbs and grilled.',
        price: 22,
        category: 'Dinner',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Grilled Salmon',
        description: 'Fresh salmon fillet seasoned and grilled, served with lemon butter sauce.',
        price: 20,
        category: 'Lunch',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Chicken Alfredo Pasta',
        description: 'Creamy pasta with grilled chicken, parmesan cheese, and garlic sauce.',
        price: 16,
        category: 'Dinner',
        foodType: 'Non-Veg',
        imageUrl: 'https://images.unsplash.com/photo-1560717845-968823efbee1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
];

async function seedFood() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_reservation');
        console.log('Connected to MongoDB');

        // Clear existing food items
        await FoodItem.deleteMany({});
        console.log('Existing food items removed');

        await FoodItem.insertMany(foodItems);
        console.log('20 Food items seeded successfully');

        process.exit();
    } catch (err) {
        console.error('Error seeding food:', err);
        process.exit(1);
    }
}

seedFood();
