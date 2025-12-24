import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/general/Header';
import Footer from './components/general/Footer';
import LandingPage from './pages/LandingPage';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import OwnerLogin from './pages/OwnerLogin';
import RestaurantRegister from './pages/RestaurantRegister';
import FindTables from './pages/FindTables';
import RestaurantDetails from './pages/RestaurantDetails';
import DashboardHome from './pages/owner-dashboard/DashboardHome';
import ReservationsPage from './pages/owner-dashboard/ReservationsPage';
import TablesPage from './pages/owner-dashboard/TablesPage';
import TableConfigPage from './pages/owner-dashboard/TableConfigPage';
import BookingRulesPage from './pages/owner-dashboard/BookingRulesPage';
import OpeningHoursPage from './pages/owner-dashboard/OpeningHoursPage';
import SettingsPage from './pages/owner-dashboard/SettingsPage';


// Layout for public pages (Header + Footer)
const MainLayout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Full Screen Auth Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/restaurant/register" element={<RestaurantRegister />} />
        {/* Kept separate or could be in MainLayout depending on preference, but Register usually standalone */}

        {/* Public Routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register-restaurant" element={<RestaurantRegister />} /> {/* configure redirection if deprecated */}
          <Route path="/find-tables" element={<FindTables />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        </Route>

        {/* Dashboard Routes (No Header/Footer) */}
        <Route path="/manage/dashboard" element={<DashboardHome />} />
        <Route path="/manage/reservations" element={<ReservationsPage />} />
        <Route path="/manage/tables" element={<TablesPage />} /> {/* View Only tables */}
        <Route path="/manage/config/tables" element={<TableConfigPage />} /> {/* Edit tables */}
        <Route path="/manage/config/rules" element={<BookingRulesPage />} />
        <Route path="/manage/config/hours" element={<OpeningHoursPage />} />
        <Route path="/manage/settings" element={<SettingsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
