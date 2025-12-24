# Smart Dine - Restaurant Reservation System

A full-stack restaurant reservation and management system built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Customer Portal**: Find tables, view restaurant details, book reservations.
- **Restaurant Owner Dashboard**: Manage reservations, configure tables, set booking rules, and update operating hours.
- **Authentication**: Secure login/signup for both customers and restaurant owners.

## Prerequisites
- **Node.js**: Install from [nodejs.org](https://nodejs.org/) (v14+ recommended).
- **MongoDB**: You need a MongoDB connection string (Atlas or local).

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd smart-dine-app
```

### 2. server Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Client Setup
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

## Running the Application

### 1. Start the Backend Server
In the `server` directory:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### 2. Start the Frontend Client
In the `client` directory (open a new terminal):
```bash
npm run dev
```
The client will start on `http://localhost:5173` (or similar).

## Usage
- Open your browser and go to `http://localhost:5173`.
- **Customer Access**: Sign up/Login to book tables.
- **Owner Access**: Go to "For Restaurants" -> "Register" to create a restaurant profile and access the dashboard.
