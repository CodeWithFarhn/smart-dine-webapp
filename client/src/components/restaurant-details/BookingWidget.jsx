import { useState } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';

const BookingWidget = ({ selectedTable, onReserve, restaurantName = "the restaurant" }) => {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1); // 1: Details, 2: Contact/Confirm

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Mock Data for pills
    const timeSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
    const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

    const [bookingData, setBookingData] = useState({
        date: '',
        time: '7:00 PM',
        partySize: 2,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 000-0000',
        specialRequests: ''
    });

    return (
        <>
            {/* Widget Card (Side Box) */}
            <Card className="border-0 shadow-sm sticky-top" style={{ top: '100px', zIndex: 1000 }}>
                <Card.Body className="p-4">
                    <h4 className="font-serif fw-bold mb-3">Reserve a Table</h4>
                    <p className="text-secondary mb-4 small">
                        Book your table now and enjoy an unforgettable dining experience
                    </p>

                    <Button
                        variant="primary"
                        size="lg"
                        className="w-100 fw-bold border-0 d-flex align-items-center justify-content-center gap-2"
                        style={{ backgroundColor: '#d1491a', padding: '12px 0' }}
                        onClick={handleShow}
                    >
                        <i className="bi bi-people-fill"></i>
                        Book a Table
                    </Button>

                    <div className="mt-4 pt-3 border-top">
                        <div className="d-flex align-items-center gap-2 mb-2 text-secondary small">
                            <i className="bi bi-clock"></i> Instant confirmation
                        </div>
                        <div className="d-flex align-items-center gap-2 text-secondary small">
                            <i className="bi bi-star"></i> Highly rated restaurant
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Booking Modal */}
            <Modal show={showModal} onHide={handleClose} size="lg" centered className="font-sans">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="font-serif fw-bold">Book a Table at {restaurantName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-2 pb-4 px-4">
                    <p className="text-muted small mb-4">Select your preferred date, time, and party size</p>

                    <Form>
                        {/* Section: Date */}
                        <div className="mb-4">
                            <Form.Label className="fw-bold small">Select Date</Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type="date"
                                    className="border-secondary-subtle py-2"
                                    value={bookingData.date}
                                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Section: Time */}
                        <div className="mb-4">
                            <Form.Label className="fw-bold small">Select Time</Form.Label>
                            <div className="d-flex flex-wrap gap-2">
                                {timeSlots.map(time => (
                                    <Button
                                        key={time}
                                        variant="outline-secondary"
                                        className={`px-3 py-2 border-opacity-25 ${bookingData.time === time ? 'active bg-white text-dark border-dark' : 'bg-white text-dark'}`}
                                        style={{
                                            borderColor: bookingData.time === time ? '#333' : '#dee2e6',
                                            borderWidth: '1px',
                                            minWidth: '100px',
                                            fontSize: '0.9rem'
                                        }}
                                        onClick={() => setBookingData({ ...bookingData, time })}
                                    >
                                        <i className="bi bi-clock me-1 text-muted"></i> {time}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Section: Party Size */}
                        <div className="mb-4">
                            <Form.Label className="fw-bold small">Party Size</Form.Label>
                            <div className="d-flex flex-wrap gap-2">
                                {partySizes.map(size => (
                                    <Button
                                        key={size}
                                        variant="outline-secondary"
                                        className={`d-flex align-items-center justify-content-center ${bookingData.partySize === size ? 'active' : ''}`}
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            backgroundColor: bookingData.partySize === size ? '#d94e1e' : 'white',
                                            borderColor: bookingData.partySize === size ? '#d94e1e' : '#dee2e6',
                                            color: bookingData.partySize === size ? 'white' : '#333'
                                        }}
                                        onClick={() => setBookingData({ ...bookingData, partySize: size })}
                                    >
                                        <i className="bi bi-person me-1" style={{ fontSize: '0.8rem' }}></i> {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {selectedTable && (
                            <div className="mb-4 p-3 bg-light rounded-3 border d-flex align-items-center gap-3">
                                <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                    <i className="bi bi-check-lg"></i>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-0">Specific Table Selected</h6>
                                    <small className="text-muted">{selectedTable.name} ({selectedTable.type})</small>
                                </div>
                            </div>
                        )}

                        <hr className="my-4" />

                        {/* Contact Info */}
                        <div className="mb-3">
                            <Form.Label className="fw-bold small">Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John Doe"
                                className="py-2 border-secondary-subtle"
                                value={bookingData.name}
                                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                            />
                        </div>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label className="fw-bold small">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="john@example.com"
                                    className="py-2 border-secondary-subtle"
                                    value={bookingData.email}
                                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label className="fw-bold small">Phone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    className="py-2 border-secondary-subtle"
                                    value={bookingData.phone}
                                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                />
                            </Col>
                        </Row>

                        <div className="mb-4">
                            <Form.Label className="fw-bold small">Special Requests (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Dietary restrictions, occasion, etc."
                                className="py-2 border-secondary-subtle"
                                value={bookingData.specialRequests}
                                onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                            />
                        </div>

                        <div className="d-flex gap-3">
                            <Button variant="outline-secondary" className="w-100 py-2" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="w-100 py-2 fw-bold text-white border-0"
                                style={{ backgroundColor: '#e2ae85' }} // Beige/Orange from mockup
                                onClick={() => {
                                    onReserve(bookingData);
                                    handleClose();
                                }}
                            >
                                Confirm Booking
                            </Button>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default BookingWidget;
