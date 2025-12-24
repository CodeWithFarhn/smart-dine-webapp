import { Card, Button, Ratio } from 'react-bootstrap';
import StyledBadge from './StyledBadge';


const RestaurantCard = ({
    id,
    name,
    cuisine,
    image,
    rating,
    avgBookingTime,
    location,
    priceRange,
    onBook
}) => {
    return (
        <Card className="h-100 border-0 shadow-sm overflow-hidden rounded-4 restaurant-card w-100 position-relative">
            {/* Image Container */}
            <div className="position-relative">
                <Ratio aspectRatio="16x9">
                    <Card.Img
                        variant="top"
                        src={image}
                        alt={name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </Ratio>
                <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                    <StyledBadge variant="default" className="d-flex align-items-center gap-1">
                        <span style={{ fontSize: '0.9rem' }}>{rating}</span>
                        <i className="bi bi-star-fill text-warning"></i>
                    </StyledBadge>
                </div>
            </div>

            <Card.Body className="p-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold mb-0 text-dark font-serif" style={{ fontSize: '1.25rem' }}>{name}</h5>
                </div>

                <div className="d-flex align-items-center gap-2 mb-3">
                    <StyledBadge variant="secondary">{cuisine}</StyledBadge>
                    <StyledBadge variant="outline">{priceRange}</StyledBadge>
                </div>

                <div className="text-secondary small mb-4 flex-grow-1">
                    <div className="d-flex align-items-center mb-2 gap-2">
                        <i className="bi bi-geo-alt text-muted"></i>
                        <span className="text-truncate">{location}</span>
                    </div>
                    {avgBookingTime && (
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-clock text-muted"></i>
                            <span>Avg. booking: {avgBookingTime}</span>
                        </div>
                    )}
                </div>

                <Button
                    variant="primary"
                    className="w-100 fw-bold py-2 border-0 d-flex align-items-center justify-content-center gap-2"
                    style={{ backgroundColor: '#d94e1e' }}
                    onClick={() => onBook && onBook(id)}
                >
                    <i className="bi bi-people-fill"></i>
                    Book a Table
                </Button>
            </Card.Body>
        </Card>
    );
};

export default RestaurantCard;
