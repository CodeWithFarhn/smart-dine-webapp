import { useState, useEffect } from 'react'; // Added useEffect
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/general/StyledCard';
import Badge from '../components/general/StyledBadge';
import { API_ENDPOINTS } from '../config/api';

// Helper to generate mock available times based on hours (since backend availability is complex)
const getAvailableTimes = (hours) => {
    // Simple mock logic: if open, return some slots
    // In real app, this would check Reservation model availability
    if (!hours) return ["6:00 PM", "7:00 PM", "8:00 PM"];
    return ["5:00 PM", "6:30 PM", "7:00 PM", "8:15 PM"];
};

const FindTables = () => {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState("7:00 PM");
    const [partySize, setPartySize] = useState("2");
    const [cuisine, setCuisine] = useState("All");
    const [priceRange, setPriceRange] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.GET_RESTAURANTS);
                const data = await res.json();

                // Map backend data to UI format
                // Note: Using images from seed or placeholders
                const mappedData = data.map(r => ({
                    id: r._id,
                    name: r.name,
                    cuisine: r.cuisineType,
                    // Use seed images if available, else generic
                    image: r.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
                    rating: 4.5, // Default rating as backend doesn't have reviews yet
                    reviews: 0,
                    priceRange: r.priceRange,
                    location: r.address.city, // Neighborhood logic could go here
                    distance: "1.2 mi", // Mock distance
                    availableTimes: getAvailableTimes(r.operatingHours?.monFri),
                    raw: r // Keep raw data if needed
                }));

                setRestaurants(mappedData);
            } catch (err) {
                console.error("Failed to fetch restaurants:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    const filteredRestaurants = restaurants.filter((restaurant) => {
        const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCuisine = cuisine === "All" || restaurant.cuisine === cuisine;
        const matchesPrice = priceRange === "All" || restaurant.priceRange === priceRange;
        return matchesSearch && matchesCuisine && matchesPrice;
    });

    const CUISINES = ["All", "Italian", "French", "Japanese", "Chinese", "Mexican", "Indian", "American"];
    const PRICE_RANGES = ["All", "$", "$$", "$$$", "$$$$"];
    const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8+"];

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
