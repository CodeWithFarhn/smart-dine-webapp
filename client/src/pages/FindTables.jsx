import { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import RestaurantListItem from '../components/find-tables/RestaurantListItem';
import lePetitBistroImg from '../assets/le-petit-bistro.png';

const FindTables = () => {
    const [filters, setFilters] = useState({
        date: '2025-11-15',
        time: '7:00 PM',
        partySize: '2 people',
        search: ''
    });

    const restaurants = [
        {
            _id: '1',
            name: 'La Bella Italia',
            image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
            rating: 4.8,
            reviewCount: 342,
            cuisine: 'Italian',
            priceRange: '$$',
            location: 'Downtown',
            distance: '0.8 mi',
            timeSlots: ['5:00 PM', '5:30 PM', '7:00 PM', '8:00 PM']
        },
        {
            _id: '2',
            name: 'Sakura Sushi',
            image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80',
            rating: 4.6,
            reviewCount: 215,
            cuisine: 'Japanese',
            priceRange: '$$$',
            location: 'Midtown',
            distance: '1.2 mi',
            timeSlots: ['6:00 PM', '6:30 PM', '8:30 PM']
        },
        {
            _id: '3',
            name: 'Le Petit Bistro',
            image: lePetitBistroImg,
            rating: 4.9,
            reviewCount: 428,
            cuisine: 'French',
            priceRange: '$$$$',
            location: 'Arts District',
            distance: '2.1 mi',
            timeSlots: ['5:30 PM', '7:30 PM', '9:00 PM']
        },
        {
            _id: '4',
            name: 'Spice Garden',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            rating: 4.5,
            reviewCount: 187,
            cuisine: 'Indian',
            priceRange: '$$',
            location: 'East Side',
            distance: '1.5 mi',
            timeSlots: ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
        }
    ];

    return (
        <div className="bg-light min-vh-100 pb-5" style={{ paddingTop: '76px' }}>
            {/* Filter Bar */}
            <div className="bg-white border-bottom py-4 shadow-sm">
                <Container>
                    <Row className="g-3 align-items-end">
                        <Col md={3} sm={6}>
                            <Form.Label className="fw-bold small">Date</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="date"
                                    value={filters.date}
                                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                    className="border-secondary-subtle"
                                />
                            </InputGroup>
                        </Col>
                        <Col md={2} sm={6}>
                            <Form.Label className="fw-bold small">Time</Form.Label>
                            <Form.Select
                                value={filters.time}
                                onChange={(e) => setFilters({ ...filters, time: e.target.value })}
                                className="border-secondary-subtle"
                            >
                                <option>6:00 PM</option>
                                <option>6:30 PM</option>
                                <option>7:00 PM</option>
                                <option>7:30 PM</option>
                            </Form.Select>
                        </Col>
                        <Col md={2} sm={6}>
                            <Form.Label className="fw-bold small">Party Size</Form.Label>
                            <Form.Select
                                value={filters.partySize}
                                onChange={(e) => setFilters({ ...filters, partySize: e.target.value })}
                                className="border-secondary-subtle"
                            >
                                <option>2 people</option>
                                <option>3 people</option>
                                <option>4 people</option>
                                <option>5+ people</option>
                            </Form.Select>
                        </Col>
                        <Col md={3} sm={6}>
                            <Form.Label className="fw-bold small">Search</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-white border-end-0 border-secondary-subtle">
                                    <i className="bi bi-search"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Restaurant or cuisine"
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="border-start-0 border-secondary-subtle shadow-none"
                                />
                            </InputGroup>
                        </Col>
                        <Col md={2}>
                            <Button variant="outline-dark" className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2">
                                <i className="bi bi-sliders"></i> Filters
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Content */}
            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="font-serif fw-bold mb-0">{restaurants.length} restaurants available</h2>
                    <span className="text-muted small">
                        {filters.date} at {filters.time} for {filters.partySize}
                    </span>
                </div>

                {restaurants.map(restaurant => (
                    <RestaurantListItem key={restaurant._id} restaurant={restaurant} />
                ))}
            </Container>
        </div>
    );
};

export default FindTables;
