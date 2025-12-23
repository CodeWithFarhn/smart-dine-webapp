import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RestaurantListItem = ({ restaurant }) => {
    return (
        <Link to={`/restaurant/${restaurant._id}`} className="text-decoration-none">
            <Card className="restaurant-card border-0 shadow-sm mb-4 overflow-hidden rounded-4">
                <div className="d-flex flex-column flex-md-row">
                    {/* Image Section */}
                    <div className="restaurant-img-container">
                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Content Section */}
                    <Card.Body className="p-4 d-flex flex-column flex-grow-1">
                        <div className="mb-2">
                            <h3 className="fw-bold mb-2 font-serif text-dark display-6" style={{ fontSize: '1.75rem' }}>{restaurant.name}</h3>

                            <div className="d-flex flex-wrap align-items-center gap-3 text-secondary mb-3">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                    <span className="fw-bold text-dark me-1">{restaurant.rating}</span>
                                    <span className="text-secondary">({restaurant.reviewCount})</span>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <span className="px-2 py-1 bg-light rounded-2 small fw-semibold text-dark border">
                                        {restaurant.cuisine}
                                    </span>
                                    <span className="px-2 py-1 bg-light rounded-2 small fw-semibold text-dark border">
                                        {restaurant.priceRange}
                                    </span>
                                </div>

                                <div className="d-flex align-items-center text-muted small">
                                    <i className="bi bi-geo-alt me-1"></i>
                                    {restaurant.location} • {restaurant.distance}
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto border-top pt-3">
                            <div className="d-flex align-items-center text-secondary small mb-3">
                                <i className="bi bi-clock me-2"></i>
                                <span className="fw-semibold">Available times:</span>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                {restaurant.timeSlots.map((time, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline-dark"
                                        className="fw-semibold px-4 py-2 border-opacity-25"
                                        style={{
                                            backgroundColor: '#f8f9fa',
                                            borderColor: '#dee2e6',
                                            color: '#212529',
                                            fontSize: '0.9rem',
                                            minWidth: '100px'
                                        }}
                                    >
                                        {time}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </Card.Body>
                </div>
            </Card>
        </Link>
    );
};

export default RestaurantListItem;
