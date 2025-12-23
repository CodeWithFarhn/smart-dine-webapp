import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/general/Header';
import Footer from './components/general/Footer';
import LandingPage from './pages/LandingPage';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import RestaurantRegister from './pages/RestaurantRegister';
import FindTables from './pages/FindTables';
import RestaurantDetails from './pages/RestaurantDetails';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          {/* Removed Container here to allow Hero to go full width */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/register-restaurant" element={<RestaurantRegister />} />
            <Route path="/find-tables" element={<FindTables />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
