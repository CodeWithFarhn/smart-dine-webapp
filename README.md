<div align="center">
  <h1>ReserveEase</h1>
  <p><strong>Smart Restaurant Reservation Platform</strong></p>
  <p>A comprehensive full-stack restaurant booking and management system built with the MERN stack</p>

![MongoDB](https://img.shields.io/badge/MongoDB-9.0.2-green?style=flat&logo=mongodb)
![Express.js](https://img.shields.io/badge/Express.js-5.2.1-blue?style=flat&logo=express)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3?style=flat&logo=bootstrap)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## Overview

**ReserveEase** is a modern, full-featured restaurant reservation platform that bridges the gap between diners and restaurants. The system provides an intuitive booking experience for customers while offering powerful management tools for restaurant owners.

### Key Highlights

- **46+ React Components** - Modular, reusable UI architecture
- **13 Pages** - Complete customer and owner journeys
- **4 Database Models** - Normalized schema with relationships
- **12+ RESTful APIs** - Comprehensive backend coverage
- **JWT Authentication** - Secure role-based access control
- **Real-time Validation** - Email, phone, and form validation
- **Responsive Design** - Mobile-first, accessible UI

---

## ✨ Features

### For Customers

- **Restaurant Discovery**
  - Browse curated restaurant listings
  - Filter by cuisine, price range, and location
  - View detailed restaurant profiles with photos and reviews

- **Smart Booking System**
  - Real-time table availability
  - Visual table selection interface
  - Date, time, and party size selection
  - Special requests and dietary notes
  - Booking confirmation via email

- **User Management**
  - Secure registration and login
  - Profile management
  - Booking history and upcoming reservations

### For Restaurant Owners

- **Comprehensive Dashboard**
  - Real-time statistics (daily/weekly/monthly)
  - Revenue tracking and analytics
  - Reservation overview with status indicators
  - Interactive charts and visualizations

- **Reservation Management**
  - View all bookings (today, upcoming, past)
  - Confirm, cancel, or modify reservations
  - Customer contact information
  - Party size and special request tracking
  - Status filtering and search

- **Table Configuration**
  - Add, edit, and delete tables
  - Set capacity (1-20 seats)
  - Define table types (Standard, Booth, High Top, Outdoor)
  - Organize by sections (Main Dining, Outdoor, Private, Bar, Lounge)
  - Visual table management interface

- **Booking Rules Engine**
  - Configure party size limits (min/max)
  - Set reservation duration (30-180 minutes)
  - Define advance booking windows
  - Seating flexibility settings:
    - Exact-fit table preferences
    - Over-capacity thresholds
    - Partial booking support
    - Orphan seat management
  - Peak hours definition
  - Walk-in and phone confirmation policies

- **Operating Hours Management**
  - Weekly schedule configuration
  - Multiple time slots per day
  - Day-specific open/close toggles
  - Blackout dates for holidays and closures
  - Split service periods (lunch/dinner)

- **Restaurant Settings**
  - Profile information management
  - Contact details and address
  - Email and phone validation
  - Auto-confirmation preferences
  - Notification settings

---

## 🛠 Technology Stack

### Frontend

| Technology           | Version | Purpose                    |
| -------------------- | ------- | -------------------------- |
| **React**            | 19.2.0  | UI framework with hooks    |
| **React Router DOM** | 7.11.0  | Client-side routing        |
| **Bootstrap**        | 5.3.8   | UI component library       |
| **React Bootstrap**  | 2.10.10 | React Bootstrap components |
| **Recharts**         | 3.6.0   | Data visualization         |
| **Vite**             | 6.0.7   | Build tool and dev server  |
| **date-fns**         | 4.1.0   | Date manipulation          |
| **Bootstrap Icons**  | 1.13.1  | Icon library               |

### Backend

| Technology     | Version | Purpose                       |
| -------------- | ------- | ----------------------------- |
| **Node.js**    | 18+     | Runtime environment           |
| **Express.js** | 5.2.1   | Web framework                 |
| **MongoDB**    | 9.0.2   | NoSQL database                |
| **Mongoose**   | 9.0.2   | MongoDB ODM                   |
| **JWT**        | 9.0.3   | Authentication tokens         |
| **bcryptjs**   | 3.0.3   | Password hashing              |
| **dotenv**     | 17.2.3  | Environment management        |
| **CORS**       | 2.8.5   | Cross-origin resource sharing |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT (React)                    │
│  ┌───────────────┐  ┌──────────────────────────┐  │
│  │   Pages (13)  │  │   Components (46+)       │  │
│  │  - Landing    │  │   - Auth Layouts         │  │
│  │  - Login      │  │   - Restaurant Cards     │  │
│  │  - Dashboard  │  │   - Booking Widgets      │  │
│  └───────────────┘  └──────────────────────────┘  │
└───────────────┬─────────────────────────────────────┘
                │ HTTP/JSON (REST API)
                │ JWT Authentication
                ▼
┌─────────────────────────────────────────────────────┐
│              SERVER (Express.js)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Routes  │─▶│Controllers│─▶│   Middleware     │ │
│  │ (4 files)│  │ (4 files) │  │ (Auth, Error)    │ │
│  └──────────┘  └──────────┘  └──────────────────┘ │
└───────────────┬─────────────────────────────────────┘
                │ Mongoose ODM
                │ CRUD Operations
                ▼
┌─────────────────────────────────────────────────────┐
│           DATABASE (MongoDB Atlas)                  │
│  ┌─────────┐ ┌─────────────┐ ┌────────┐ ┌────────┐│
│  │  Users  │ │ Restaurants │ │ Tables │ │Reserv- ││
│  │         │ │             │ │        │ │ations  ││
│  └─────────┘ └─────────────┘ └────────┘ └────────┘│
└─────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas) (or use local MongoDB)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/CodeWithFarhn/smart-dine-webapp.git
cd smart-dine-webapp
```

2. **Backend Setup**

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. **Frontend Setup**

```bash
cd ../client
npm install
```

### Running the Application

**Development Mode:**

Open two terminal windows:

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173`

**Production Build:**

```bash
cd client
npm run build
```

---

## Environment Variables

### Server (.env)

| Variable     | Description                | Example                                          |
| ------------ | -------------------------- | ------------------------------------------------ |
| `PORT`       | Server port number         | `5000`                                           |
| `MONGO_URI`  | MongoDB connection string  | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key_here`                     |

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| `POST` | `/api/users`         | Register new user | ❌            |
| `POST` | `/api/users/login`   | User login        | ❌            |
| `GET`  | `/api/users/profile` | Get user profile  | ✅            |

### Restaurant Endpoints

| Method | Endpoint               | Description          | Auth Required |
| ------ | ---------------------- | -------------------- | ------------- |
| `POST` | `/api/restaurants`     | Register restaurant  | ✅ (Owner)    |
| `GET`  | `/api/restaurants`     | Get all restaurants  | ❌            |
| `GET`  | `/api/restaurants/:id` | Get restaurant by ID | ❌            |
| `PUT`  | `/api/restaurants/:id` | Update restaurant    | ✅ (Owner)    |

### Table Endpoints

| Method   | Endpoint                     | Description           | Auth Required |
| -------- | ---------------------------- | --------------------- | ------------- |
| `POST`   | `/api/tables`                | Add new table         | ✅ (Owner)    |
| `GET`    | `/api/tables/restaurant/:id` | Get restaurant tables | ❌            |
| `PUT`    | `/api/tables/:id`            | Update table          | ✅ (Owner)    |
| `DELETE` | `/api/tables/:id`            | Delete table          | ✅ (Owner)    |

### Reservation Endpoints

| Method   | Endpoint                | Description           | Auth Required |
| -------- | ----------------------- | --------------------- | ------------- |
| `POST`   | `/api/reservations`     | Create reservation    | ✅            |
| `GET`    | `/api/reservations`     | Get all reservations  | ✅            |
| `GET`    | `/api/reservations/:id` | Get reservation by ID | ✅            |
| `PUT`    | `/api/reservations/:id` | Update reservation    | ✅            |
| `DELETE` | `/api/reservations/:id` | Cancel reservation    | ✅            |

---

## 📁 Project Structure

```
smart-dine-webapp/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images and media
│   │   ├── components/              # React components
│   │   │   ├── auth/                # Authentication components
│   │   │   ├── general/             # Reusable UI components
│   │   │   ├── landing-page/        # Landing page sections
│   │   │   ├── owner-dashboard/     # Dashboard components
│   │   │   └── restaurant-details/  # Restaurant detail components
│   │   ├── pages/                   # Page components
│   │   │   ├── owner-dashboard/     # Owner dashboard pages
│   │   │   ├── FindTables.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── RegisterScreen.jsx
│   │   │   └── RestaurantDetails.jsx
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend Node.js application
│   ├── config/
│   │   └── db.js                    # Database connection
│   ├── controllers/                 # Route controllers
│   │   ├── reservationController.js
│   │   ├── restaurantController.js
│   │   ├── tableController.js
│   │   └── userController.js
│   ├── middleware/                  # Custom middleware
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorMiddleware.js       # Error handling
│   ├── models/                      # Mongoose schemas
│   │   ├── Reservation.js
│   │   ├── Restaurant.js
│   │   ├── Table.js
│   │   └── User.js
│   ├── routes/                      # API routes
│   │   ├── reservationRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── tableRoutes.js
│   │   └── userRoutes.js
│   ├── index.js                     # Server entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🧪 Testing

### Manual Testing Credentials

**Test Customer Account:**

```
Email: demo@user.com
Password: password123
```

**Test Restaurant Owner:**

```
Email: owner@restaurant.com
Password: password123
```

---

## 🎨 Features Showcase

### Form Validations

- ✅ Email format validation (RFC 5322 compliant)
- ✅ Pakistani phone number validation (+923XXXXXXXXX)
- ✅ Password strength requirements
- ✅ Real-time field validation with error messages

### User Experience

- ✅ Smooth animations and transitions
- ✅ Loading states and spinners
- ✅ Toast notifications for actions
- ✅ Responsive mobile-first design
- ✅ Dark mode support (partial)

### Security

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Input sanitization
- ✅ CORS configuration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Farhan**

- GitHub: [@CodeWithFarhn](https://github.com/CodeWithFarhn)
- Repository: [smart-dine-webapp](https://github.com/CodeWithFarhn/smart-dine-webapp)

---

## 🙏 Acknowledgments

- Bootstrap team for the excellent UI framework
- MongoDB for cloud database services
- React community for comprehensive documentation
- All open-source contributors

---

<div align="center">
  <p>Made with ❤️ using the MERN Stack</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
