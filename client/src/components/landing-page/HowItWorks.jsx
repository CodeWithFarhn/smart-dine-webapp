import { Container, Row, Col } from 'react-bootstrap';

const HowItWorks = () => {
    return (
        <div className="bg-light py-5">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="fw-bold">How It Works</h2>
                    <p className="text-muted">Book your perfect table in three simple steps</p>
                </div>

                <Row className="text-center">
                    <Col md={4} className="mb-4">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="rounded-circle bg-orange-light p-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', backgroundColor: '#ffeec2' }}>
                                <i className="bi bi-search fs-2 text-warning"></i>
                            </div>
                        </div>
                        <h5 className="fw-bold">Discover Restaurants</h5>
                        <p className="text-muted small px-4">Browse curated dining experiences from the finest restaurants in your area</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="rounded-circle bg-orange-light p-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', backgroundColor: '#ffeec2' }}>
                                <i className="bi bi-clock fs-2 text-warning"></i>
                            </div>
                        </div>
                        <h5 className="fw-bold">Real-Time Availability</h5>
                        <p className="text-muted small px-4">See live table availability and book instantly without waiting</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="rounded-circle bg-orange-light p-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', backgroundColor: '#ffeec2' }}>
                                <i className="bi bi-shield-check fs-2 text-warning"></i>
                            </div>
                        </div>
                        <h5 className="fw-bold">Secure Bookings</h5>
                        <p className="text-muted small px-4">Your reservations are confirmed instantly with email notifications</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HowItWorks;
