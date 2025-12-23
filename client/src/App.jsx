import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/general/Header';
import LandingPage from './pages/LandingPage';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import RestaurantRegister from './pages/RestaurantRegister';

function App() {
  return (
    <Router>
      <Header />
      <main>
        {/* Removed Container here to allow Hero to go full width */}
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Container><LoginScreen /></Container>} />
          <Route path='/register' element={<Container><RegisterScreen /></Container>} />
          <Route path='/register-restaurant' element={<RestaurantRegister />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
