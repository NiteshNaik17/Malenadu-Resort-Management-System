# Malenadu Resort Reservation System 🌿🏨

Welcome to the **Malenadu Resort Reservation System**, a full-stack web application designed to provide a seamless booking experience for guests and an efficient management platform for administrators.

## 🚀 Features

### For Guests:
- **User Authentication:** Secure registration and login system using JWT.
- **Room Booking:** Browse available rooms and book them with ease.
- **Food Ordering:** Explore the resort's food menu and place orders online.
- **Package Selection:** Choose from various resort packages for a tailored experience.
- **Queries & Contact:** Direct communication channel with the resort staff.

### For Administrators:
- **Dashboard:** Comprehensive overview of resort operations.
- **User Management:** Manage user accounts and permissions.
- **Room & Inventory Management:** Track room availability and update details.
- **Order & Booking Tracking:** Monitor real-time bookings and food orders.

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3 (Bootstrap 5), JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Environment Management:** dotenv

## 📁 Project Structure

```
├── config/             # Database configuration
├── models/             # Mongoose models (User, Room, Booking, etc.)
├── public/             # Frontend assets (HTML, CSS, JS, Images)
├── routes/             # Express API routes
├── seed.js             # Data seeding scripts
├── server.js           # Main application entry point
└── .env                # Environment variables
```

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NiteshNaik17/system-project.git
   cd system-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Seed the Database (Optional):**
   ```bash
   node seed.js
   node seed_food.js
   node seed_packages.js
   ```

5. **Run the Application:**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the system.

## 📄 License

This project is licensed under the ISC License.

---
Developed with ❤️ by [Nitesh Naik](https://github.com/NiteshNaik17)
