import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Badge, Image, Button } from 'react-bootstrap';
import BookingWidget from '../components/restaurant-details/BookingWidget';
import VisualTableSelector from '../components/restaurant-details/VisualTableSelector';

// Mock Data Lookup (In a real app, this would be an API call)
const text = "Experience authentic Italian cuisine in an elegant setting. Our chef brings traditional recipes from Naples, combining fresh ingredients with time-honored cooking techniques.";
const mockRestaurants = {
    '1': {
        name: 'La Bella Italia',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
        rating: 4.8,
        reviewCount: 342,
        cuisine: 'Italian',
        priceRange: '$$',
        location: 'Downtown',
        address: '123 Main Street, Downtown',
        description: text,
        gallery: [
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', // Main
            'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80', // Dish 1 (Pasta)
            'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80'  // Dish 2 (Pasta)
        ]
    },
    '2': {
        name: 'Sakura Sushi',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1200&q=80',
        rating: 4.6,
        reviewCount: 215,
        cuisine: 'Japanese',
        priceRange: '$$$',
        location: 'Midtown',
        address: '456 Oak Ave, Midtown',
        description: "Premium sushi and sashimi prepared by master chefs in a serene, modern Japanese atmosphere.",
        gallery: [
            'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', // Sushi
            'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80'  // Sushi
        ]
    },
    // Fallback for others
    'default': {
        name: 'Restaurant Name',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        rating: 4.5,
        reviewCount: 100,
        cuisine: 'Cuisine',
        priceRange: '$$',
        location: 'Location',
        address: '789 Pine St, City',
        description: "A wonderful dining experience waiting for you.",
        gallery: [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80'
        ]
    }
};

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(mockRestaurants['default']);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        if (id && mockRestaurants[id]) {
            setRestaurant(mockRestaurants[id]);
        }
    }, [id]);

    const handleReserve = () => {
        alert(`Reservation requested for ${restaurant.name} at ${selectedTable?.name || 'a table'}!`);
    };

    return (
        <div className="bg-light min-vh-100 pb-5" style={{ paddingTop: '76px' }}>
            {/* Hero Section */}
            <div
                className="position-relative w-100 d-flex align-items-end"
                style={{
                    height: '400px',
                    backgroundImage: `url(${restaurant.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
                <Container className="position-relative text-white pb-5">
                    <div className="d-flex gap-2 mb-3">
                        <Badge bg="light" text="dark" className="fw-medium px-3 py-2">{restaurant.cuisine}</Badge>
                        <Badge bg="light" text="dark" className="fw-medium px-3 py-2">{restaurant.priceRange}</Badge>
                    </div>
                    <h1 className="display-3 fw-bold font-serif mb-2">{restaurant.name}</h1>
                    <div className="d-flex align-items-center gap-4 text-white-50">
                        <span className="d-flex align-items-center gap-1 text-white">
                            <i className="bi bi-star-fill text-warning"></i>
                            <span className="fw-bold">{restaurant.rating}</span>
                            <span>({restaurant.reviewCount} reviews)</span>
                        </span>
                        <span className="d-flex align-items-center gap-1">
                            <i className="bi bi-geo-alt-fill"></i> {restaurant.address}
                        </span>
                    </div>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="g-5">
                    {/* Left Content (2/3) */}
                    <Col lg={8}>
                        {/* About Section */}
                        <div className="mb-5">
                            <h3 className="font-serif fw-bold mb-3">About</h3>
                            <p className="text-secondary lead fs-6" style={{ lineHeight: '1.8' }}>
                                {restaurant.description}
                            </p>
                        </div>

                        {/* Gallery Section */}
                        <div className="mb-5">
                            <h3 className="font-serif fw-bold mb-4">Gallery</h3>
                            <Row className="g-3">
                                {restaurant.gallery.map((img, idx) => (
                                    <Col md={4} key={idx}>
                                        <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: '200px' }}>
                                            <Image src={img} className="w-100 h-100 object-fit-cover hover-scale" />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        {/* Visual Table Selector */}
                        <div className="mb-5">
                            <h3 className="font-serif fw-bold mb-4">Choose Your Table</h3>
                            <VisualTableSelector
                                onSelectTable={setSelectedTable}
                                selectedTableId={selectedTable?.id}
                            />
                        </div>
                    </Col>

                    {/* Right Sidebar (1/3) - Sticky */}
                    <Col lg={4}>
                        <BookingWidget
                            selectedTable={selectedTable}
                            restaurantName={restaurant.name}
                            onReserve={handleReserve}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RestaurantDetails;
