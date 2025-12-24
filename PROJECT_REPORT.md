# Smart Dine (ReserveTable) - Project Report

## 1. Project Overview
**Smart Dine** (also branded as **ReserveTable**) is a comprehensive web-based restaurant reservation and management system. It bridging the gap between hungry customers and restaurant owners.
- **For Customers:** A seamless platform to discover restaurants, view real-time table availability, and book reservations instantly.
- **For Restaurant Owners:** A powerful dashboard to manage bookings, configure table layouts, set operating rules, and view analytics.

## 2. Technology Stack
The project is built using the **MERN Stack**, ensuring a robust, scalable, and full-stack JavaScript solution.

### Frontend (Client-side)
- **Framework:** [React.js](https://react.dev/) (v18) with [Vite](https://vitejs.dev/) for fast build tooling.
- **Styling:**
  - [Bootstrap 5](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.github.io/) for layout and responsive grid.
  - **Custom CSS Modules** & Styled Components for a premium, unique aesthetic.
- **Data Visualization:** [Recharts](https://recharts.org/) for the owner dashboard analytics.
- **Routing:** [React Router DOM](https://reactrouter.com/) (v6) for single-page application navigation.
- **State Management:** React `useState`, `useEffect`, and Context API (planned) / LocalStorage for auth persistence.

### Backend (Server-side)
- **Runtime:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) framework.
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud NoSQL database).
- **ODM:** [Mongoose](https://mongoosejs.com/) for elegant MongoDB object modeling.
- **Authentication:** JSON Web Tokens (JWT) for stateless, secure authentication.

## 3. Project Structure

The project is a **Monorepo** structure containing both client and server code.

### `/client` (Frontend)
The user interface logic resides here.
*   **`src/components/`**: Reusable UI blocks.
    *   **`auth/`**: `AuthLayout.jsx` (Split-screen login/register containers).
    *   **`general/`**: Highly styled UI atoms (`StyledCard`, `StyledButton`, `Header`, `Footer`).
    *   **`owner-dashboard/`**: Dashboard-specific widgets (`Sidebar`, `StatCard`, `ReservationTable`).
    *   **`restaurant-details/`**: Complex booking logic (`BookingWidget`).
*   **`src/pages/`**: Main view controllers.
    *   **`owner-dashboard/`**: Protected pages (`ReservationsPage`, `TableConfigPage`, `DashboardHome`).
    *   **`LandingPage.jsx`**: Hero section and feature showcase.
    *   **`FindTables.jsx`**: Search interface fetching real data.

### `/server` (Backend)
The API and business logic reside here.
*   **`models/`**: Database Schemas.
    *   **`User.js`**: Stores user credentials and roles (`customer` vs `owner`).
    *   **`Restaurant.js`**: Key entity containing profile, hours, and config rules.
    *   **`Table.js`**: Physical table definitions (Capacity, Type, Section).
    *   **`Reservation.js`**: Booking records linking User, Restaurant, and Table.
*   **`controllers/`**: The logic layer handling requests.
    *   **`restaurantController.js`**: Logic for registering/updating restaurants.
    *   **`reservationController.js`**: Booking logic and status updates.
    *   **`tableController.js`**: CRUD operations for restaurant layouts.
*   **`routes/`**: API endpoint definitions (e.g., `/api/reservations`).
*   **`middleware/`**:
    *   **`authMiddleware.js`**: Protects routes by verifying JWT tokens.
    *   **`errorMiddleware.js`**: Centralized error handling.

## 4. Key Component Deep-Dive

### A. Authentication System
We implemented a **Role-Based Access Control (RBAC)** system.
- **Login/Register**: Forms hit `/api/users/login`. The backend validates credentials and returns a **JWT Token**.
- **Frontend Protection**: The `Sidebar` and protected routes check for this token in `localStorage`. If missing, users are redirected.
- **Owner vs Customer**: The backend User model has a `role` field. The frontend adapts the UI (showing "Dashboard" for owners vs "My Bookings" for customers).

### B. The Owner Dashboard
This is a Single-Page Application (SPA) within the main app.
- **Dynamic Data**: Pages like `DashboardHome` fetch real-time stats (reservations today, revenue) using `useEffect` hooks calling our API.
- **Table Configuration**: The `TableConfigPage` allows owners to visually add/remove tables. This creates actual documents in the MongoDB `tables` collection, which are then queried when a customer tries to book a specific table type.

### C. The Booking Widget
Located in `RestaurantDetails.jsx`, this is the core conversion point.
1.  **Selection**: User selects Date, Time, and Party Size.
2.  **Validation**: Logic checks against `Restaurant.bookingSettings` (created in the dashboard).
3.  **Submission**: Sends a POST request to `/api/reservations`.
4.  **Feedback**: Shows success/failure modals instantly.

## 5. Development Workflow & Tools
- **Version Control**: Git & GitHub for source code management.
- **API Testing**: Postman / cURL (initially) and Frontend Integration.
- **Dependency Management**: `npm` (Node Package Manager).
- **Environment Management**: `.env` files for securing DB URIs and JWT Secrets.

## 6. Future Scope
- **Payment Integration**: Stripe/Razorpay for deposit handling.
- **SMS/Email Notifications**: Using Twilio/SendGrid for booking confirmations.
- **AI Recommendations**: Suggesting restaurants based on user history.
