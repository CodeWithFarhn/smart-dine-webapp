import HeroSection from '../components/landing-page/HeroSection';
import FeaturedRestaurants from '../components/landing-page/FeaturedRestaurants';
import HowItWorks from '../components/landing-page/HowItWorks';
import OwnerSection from '../components/landing-page/OwnerSection';
import Footer from '../components/general/Footer';

const LandingPage = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <HeroSection />
            <FeaturedRestaurants />
            <HowItWorks />
            <OwnerSection />
            <Footer />
        </div>
    );
};

export default LandingPage;
