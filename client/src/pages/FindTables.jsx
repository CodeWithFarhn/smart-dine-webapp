import { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/general/StyledCard';
import Badge from '../components/general/StyledBadge'; // Default export

// import lePetitBistroImg from '../assets/le-petit-bistro.png'; // Use generic image or existing import if available

// Mock Data (including images from unsplash for demo purposes, replicating user's mock data structure)
const mockRestaurants = [
    {
        id: "1",
        name: "La Bella Italia",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 342,
        priceRange: "$$",
        location: "Downtown",
        distance: "0.8 mi",
        availableTimes: ["5:00 PM", "5:30 PM", "7:00 PM", "8:00 PM"],
    },
    {
        id: "2",
        name: "Sakura Sushi",
        cuisine: "Japanese",
        image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 215,
        priceRange: "$$$",
        location: "Midtown",
        distance: "1.2 mi",
        availableTimes: ["6:00 PM", "6:30 PM", "8:30 PM"],
    },
    {
        id: "3",
        name: "Le Petit Bistro",
        cuisine: "French",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",


        rating: 4.9,

        reviews: 428,
        priceRange: "$$$$",
        location: "Arts District",
        distance: "2.1 mi",
        availableTimes: ["5:30 PM", "7:30 PM", "9:00 PM"],
    },
    {
        id: "4",
        name: "Spice Garden",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 187,
        priceRange: "$$",
        location: "East Side",
        distance: "1.5 mi",
        availableTimes: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
    },
];

const CUISINES = ["All", "Italian", "French", "Japanese", "Chinese", "Mexican", "Indian", "Thai", "American"];
const PRICE_RANGES = ["All", "$", "$$", "$$$", "$$$$"];
const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8+"];

const FindTables = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState("2025-11-15");
    const [time, setTime] = useState("7:00 PM");
    const [partySize, setPartySize] = useState("2");
    const [cuisine, setCuisine] = useState("All");
    const [priceRange, setPriceRange] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    const filteredRestaurants = mockRestaurants.filter((restaurant) => {
        const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCuisine = cuisine === "All" || restaurant.cuisine === cuisine;
        const matchesPrice = priceRange === "All" || restaurant.priceRange === priceRange;
        return matchesSearch && matchesCuisine && matchesPrice;
    });

    const handleBookTime = (restaurantId, selectedTime) => {
        console.log("Booking:", { restaurantId, date, time: selectedTime, partySize });
        navigate(`/restaurant/${restaurantId}`);
    };

    return (
        <div className="bg-light min-vh-100 pb-5">
            {/* Sticky Filter Bar */}
            <div className="bg-white border-bottom py-4 shadow-sm sticky-top" style={{ zIndex: 1020 }}>

                <Container>
                    <Row className="g-3 align-items-end">
                        <Col lg={3} md={6}>
                            <Form.Label htmlFor="date" className="small fw-bold mb-1">Date</Form.Label>
                            <Form.Control
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="border-secondary-subtle"
                            />
                        </Col>

                        <Col lg={2} md={6}>
                            <Form.Label htmlFor="time" className="small fw-bold mb-1">Time</Form.Label>
                            <Form.Select
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="border-secondary-subtle"
                            >
                                {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"].map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col lg={2} md={6}>
                            <Form.Label htmlFor="partySize" className="small fw-bold mb-1">Party Size</Form.Label>
                            <Form.Select
                                id="partySize"
                                value={partySize}
                                onChange={(e) => setPartySize(e.target.value)}
                                className="border-secondary-subtle"
                            >
                                {PARTY_SIZES.map((size) => (
                                    <option key={size} value={size}>{size} {size === "1" ? "person" : "people"}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col lg={3} md={6}>
                            <Form.Label htmlFor="search" className="small fw-bold mb-1">Search</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-white border-end-0 border-secondary-subtle">
                                    <i className="bi bi-search text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    id="search"
                                    placeholder="Restaurant or cuisine"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-start-0 border-secondary-subtle shadow-none"
                                />
                            </InputGroup>
                        </Col>

                        <Col lg={2}>
                            <Button
                                variant="outline-dark"
                                className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <i className="bi bi-sliders"></i>
                                {showFilters ? "Hide Filters" : "Show Filters"}
                            </Button>
                        </Col>
                    </Row>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <div className="mt-3 p-3 bg-light rounded-3 border">
                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Label htmlFor="cuisine" className="small fw-bold mb-1">Cuisine Type</Form.Label>
                                    <Form.Select id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                                        {CUISINES.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                    <Form.Label htmlFor="priceRange" className="small fw-bold mb-1">Price Range</Form.Label>
                                    <Form.Select id="priceRange" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                                        {PRICE_RANGES.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            </div>

            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="font-serif fw-bold mb-0">{filteredRestaurants.length} restaurants available</h2>
                    <span className="text-muted small">
                        {date} at {time} for {partySize} {partySize === "1" ? "person" : "people"}
                    </span>
                </div>

                {filteredRestaurants.length === 0 ? (
                    <Card className="text-center py-5">
                        <CardContent className="d-flex flex-column align-items-center justify-content-center">
                            <p className="fs-5 text-muted mb-2">No restaurants found matching your criteria</p>
                            <p className="small text-muted">Try adjusting your filters or search terms</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {filteredRestaurants.map((restaurant) => (
                            <Card
                                key={restaurant.id}
                                className="overflow-hidden border-0 shadow-sm hover-shadow transition-all cursor-pointer"
                                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                            >
                                <div className="d-flex flex-column flex-md-row">
                                    <div
                                        className="restaurant-card-image flex-shrink-0"
                                        style={{
                                            backgroundImage: `url(${restaurant.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    ></div>


                                    <div className="flex-grow-1 p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h3 className="font-serif fw-bold h4 mb-2 text-dark text-decoration-none">
                                                    {restaurant.name}
                                                </h3>
                                                <div className="d-flex flex-wrap align-items-center gap-3 text-muted small">
                                                    <div className="d-flex align-items-center gap-1">
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <span className="fw-bold text-dark">{restaurant.rating}</span>
                                                        <span>({restaurant.reviews})</span>
                                                    </div>
                                                    <Badge variant="outline" className="fw-normal">{restaurant.cuisine}</Badge>
                                                    <Badge variant="outline" className="fw-normal">{restaurant.priceRange}</Badge>
                                                    <div className="d-flex align-items-center gap-1">
                                                        <i className="bi bi-geo-alt"></i>
                                                        <span>{restaurant.location}</span>
                                                        <span>• {restaurant.distance}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-3 border-top">
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <i className="bi bi-clock text-muted"></i>
                                                <span className="small fw-medium">Available times:</span>
                                            </div>
                                            <div className="d-flex flex-wrap gap-2">
                                                {restaurant.availableTimes.map((availableTime) => (
                                                    <Button
                                                        key={availableTime}
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleBookTime(restaurant.id, availableTime);
                                                        }}
                                                    >
                                                        {availableTime}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>

            <style>
                {`
                    .hover-shadow:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                    }
                    .transition-all {
                        transition: all 0.2s ease-in-out;
                    }
                    @media (max-width: 767.98px) {
                        .restaurant-card-image {
                            width: 100%;
                            height: 200px;
                        }
                    }
                    @media (min-width: 768px) {
                        .restaurant-card-image {
                            width: 280px;
                            min-height: 100%;
                        }
                    }
                `}

            </style>
        </div>
    );
}

export default FindTables;
