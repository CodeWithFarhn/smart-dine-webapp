import { Container, Row, Col } from 'react-bootstrap';
import RestaurantCard from '../general/RestaurantCard';
import { useNavigate } from 'react-router-dom';
import lePetitBistroImg from '../../assets/le-petit-bistro.png';



const restaurants = [
    {
        _id: '1',
        name: 'La Bella Italia',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        tags: ['Italian', '$$'],
        location: 'Downtown',
        avgBooking: '7:30 PM'
    },
    {
        _id: '2',
        name: 'Sakura Fusion',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        tags: ['Asian Fusion', '$$$'],
        location: 'Midtown',
        avgBooking: '8:00 PM'
    },
    {
        _id: '3',
        name: 'Le Petit Bistro',
        image: lePetitBistroImg,
        rating: 4.7,

        tags: ['French', '$$'],
        location: 'Old Town',
        avgBooking: '7:00 PM'
    }
];

const FeaturedRestaurants = () => {
    const navigate = useNavigate();

    const handleBook = (id) => {
        navigate(`/restaurant/${id}`);
    };

    return (

        <Container className="my-5 pt-4"> {/* Added pt-4 for sticky header offset if needed */}
            <div className="text-center mb-5">
                <h2 className="display-4 fw-bold mb-3 font-serif">Featured Restaurants</h2>
                <p className="text-muted fs-5">Explore our handpicked selection of exceptional dining experiences</p>
            </div>

            <Row>
                {restaurants.map((rest) => (
                    <Col lg={4} md={6} sm={12} key={rest._id} className="mb-4 d-flex justify-content-center">
                        <RestaurantCard
                            id={rest._id}
                            name={rest.name}
                            image={rest.image}
                            rating={rest.rating}
                            cuisine={rest.tags[0]} // Taking first tag as main cuisine
                            priceRange={rest.tags[1]} // Taking second as price
                            location={rest.location}
                            avgBookingTime={rest.avgBooking}
                            onBook={handleBook}
                        />
                    </Col>
                ))}
            </Row>

        </Container>
    );
};

export default FeaturedRestaurants;
