import { useState } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';

const BookingWidget = ({ selectedTable, onReserve, restaurantName = "the restaurant" }) => {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        partySize: 2,
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const timeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
    const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    // Pakistani phone number regex: +92 followed by 10 digits
    const validatePakistaniPhone = (phone) => {
        const regex = /^\+92[0-9]{10}$/;
        return regex.test(phone);
    };

    const handlePhoneChange = (value) => {
        setBookingData({ ...bookingData, phone: value });
        if (value && !validatePakistaniPhone(value)) {
            setPhoneError('Phone must be in format: +923XXXXXXXXX');
        } else {
            setPhoneError('');
        }
    };

    const handleConfirm = async () => {
        // Validate required fields
        if (!bookingData.date || !bookingData.time || !bookingData.name || !bookingData.email || !bookingData.phone) {
            setError('Please fill in all required fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(bookingData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Validate phone number format
        if (!validatePakistaniPhone(bookingData.phone)) {
            setError('Please enter a valid Pakistani phone number (e.g., +923272939028)');
            return;
        }

        // Check if user is logged in
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            setError('Please log in to make a reservation');
            // Optional: redirect to login
            // window.location.href = '/login';
            return;
        }

        try {
            setLoading(true);
            setError('');

            const user = JSON.parse(userInfo);

            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    restaurantId: restaurantName.id, // ID passed via props (needs update in parent)
                    customerName: bookingData.name,
                    customerEmail: bookingData.email,
                    customerPhone: bookingData.phone,
                    date: bookingData.date,
                    time: bookingData.time,
                    partySize: bookingData.partySize,
                    specialRequests: bookingData.specialRequests,
                    tableId: selectedTable ? selectedTable.id : null // Optional
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Booking failed');
            }

            console.log("Booking confirmed:", data);
            setStep(2); // Switch to confirmation view
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFinalClose = () => {
        setStep(1); // Reset to details
        setBookingData({ ...bookingData, specialRequests: '', name: '', email: '', phone: '' }); // Clear sensitive fields
        handleClose();
        if (onReserve) onReserve(bookingData);
    };

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
                {step === 1 ? (
                    <>
                        <Modal.Header closeButton className="border-0 pb-0">
                            <Modal.Title className="font-serif fw-bold">Book a Table at {restaurantName.name}</Modal.Title>
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
                                            className="border-secondary-subtle py-2 bg-light"
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
                                                className={`px-3 py-2 border-opacity-25 ${bookingData.time === time ? 'active bg-dark text-white border-dark' : 'bg-white text-dark'}`}
                                                style={{
                                                    minWidth: '100px',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onClick={() => setBookingData({ ...bookingData, time })}
                                            >
                                                {bookingData.time === time && <i className="bi bi-check2 me-1"></i>}
                                                {time}
                                            </Button>
                                        ))}
                                        {/* Custom Time Input */}
                                        <div className="position-relative d-inline-block">
                                            <Form.Control
                                                type="time"
                                                className={`px-3 py-2 ${!timeSlots.includes(bookingData.time) && bookingData.time ? 'bg-dark text-white border-dark' : 'bg-white text-dark border-secondary-subtle'}`}
                                                style={{ minWidth: '100px', height: '100%', cursor: 'pointer' }}
                                                value={!timeSlots.includes(bookingData.time) ? bookingData.time : ''}
                                                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                            />
                                            {!(!timeSlots.includes(bookingData.time) && bookingData.time) && (
                                                <div className="position-absolute top-50 start-50 translate-middle text-muted pe-none small">
                                                    Other
                                                </div>
                                            )}
                                        </div>

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
                                                <span style={{ fontSize: '0.9rem', fontWeight: bookingData.partySize === size ? 'bold' : 'normal' }}>{size}</span>
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
                                            placeholder="+923XXXXXXXXX"
                                            className={`py-2 border-secondary-subtle ${phoneError ? 'is-invalid' : ''}`}
                                            value={bookingData.phone}
                                            onChange={(e) => handlePhoneChange(e.target.value)}
                                        />
                                        {phoneError && (
                                            <Form.Text className="text-danger small">
                                                {phoneError}
                                            </Form.Text>
                                        )}
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

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <div className="d-flex gap-3">
                                    <Button variant="outline-secondary" className="w-100 py-2" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="w-100 py-2 fw-bold text-white border-0"
                                        style={{ backgroundColor: '#e2ae85' }} // Beige/Orange from mockup
                                        onClick={handleConfirm}
                                        disabled={loading || !bookingData.date || !bookingData.time || !bookingData.name || !bookingData.email || !bookingData.phone}
                                    >
                                        {loading ? 'Processing...' : 'Confirm Booking'}
                                    </Button>
                                </div>

                            </Form>
                        </Modal.Body>
                    </>
                ) : (
                    <>
                        <Modal.Body className="p-5 text-center">
                            <div className="mx-auto bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                                <i className="bi bi-check-lg text-success" style={{ fontSize: '2.5rem' }}></i>
                            </div>

                            <h3 className="font-serif fw-bold mb-2">Booking Confirmed!</h3>
                            <p className="text-secondary mb-4">Your reservation has been successfully confirmed.</p>

                            <div className="bg-light p-4 rounded-4 mb-4 text-start">
                                <h5 className="fw-bold mb-2 font-serif">{typeof restaurantName === 'object' ? restaurantName.name : restaurantName}</h5>
                                <div className="d-flex align-items-center gap-2 text-secondary mb-1">
                                    <i className="bi bi-calendar-event"></i>
                                    <span>{bookingData.date || 'Today'} at {bookingData.time}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 text-secondary mb-1">
                                    <i className="bi bi-people"></i>
                                    <span>Party of {bookingData.partySize}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 text-secondary">
                                    <i className="bi bi-person"></i>
                                    <span>{bookingData.name}</span>
                                </div>
                                {bookingData.email && (
                                    <div className="mt-3 pt-3 border-top small text-muted text-center">
                                        Confirmation email sent to <strong>{bookingData.email}</strong>
                                    </div>
                                )}
                            </div>

                            <Button
                                variant="dark"
                                size="lg"
                                className="w-100 rounded-pill"
                                onClick={handleFinalClose}
                            >
                                Done
                            </Button>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
};

export default BookingWidget;
