import { Container, Row, Col, Card, Button } from 'react-bootstrap';

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
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        tags: ['French', '$$'],
        location: 'Old Town',
        avgBooking: '7:00 PM'
    }
];

const FeaturedRestaurants = () => {
    return (
        <Container className="my-5 pt-4"> {/* Added pt-4 for sticky header offset if needed */}
            <div className="text-center mb-5">
                <h2 className="display-4 fw-bold mb-3">Featured Restaurants</h2>
                <p className="text-muted fs-5">Explore our handpicked selection of exceptional dining experiences</p>
            </div>

            <Row>
                {restaurants.map((rest) => (
                    <Col lg={4} md={6} sm={12} key={rest._id} className="mb-4 d-flex justify-content-center">
                        <Card className="h-100 border-0 shadow-sm restaurant-card w-100">
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <Card.Img
                                    variant="top"
                                    src={rest.image}
                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Card.Title className="h3 fw-bold mb-0 text-dark">{rest.name}</Card.Title>
                                    <div className="d-flex align-items-center">
                                        <span className="fw-bold fs-5 me-1">{rest.rating}</span>
                                        <i className="bi bi-star-fill text-warning small"></i>
                                    </div>
                                </div>

                                <div className="mb-4 d-flex gap-2">
                                    {rest.tags.map((tag, idx) => (
                                        <span key={idx} className="badge-custom rounded-pill small">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-secondary mb-4">
                                    <div className="d-flex align-items-center mb-2">
                                        <i className="bi bi-geo-alt me-3 text-muted"></i>
                                        {rest.location}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-clock me-3 text-muted"></i>
                                        Avg. booking: {rest.avgBooking}
                                    </div>
                                </div>

                                <Button
                                    className="w-100 fw-bold py-2"
                                    style={{
                                        backgroundColor: '#d94e1e',
                                        borderColor: '#d94e1e',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    <i className="bi bi-people me-2"></i>
                                    Book a Table
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeaturedRestaurants;
