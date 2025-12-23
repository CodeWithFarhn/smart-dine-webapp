import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar } from 'react-bootstrap';

const RestaurantRegister = () => {
    // Basic form state
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        restaurantName: '',
        cuisineType: '',
        priceRange: '',
        description: '',
        // Step 2: Location & Contact
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        // Step 3: Operating Hours
        hoursMonFri: '',
        hoursSat: '',
        hoursSun: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = (e) => {
        e.preventDefault();
        setStep(step + 1);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Final Submission:', formData);
        alert('Registration Completed! (Check console for data)');
    };

    // Calculate progress
    const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

    return (
        <Container className="py-5 mt-5" style={{ maxWidth: '800px' }}>
            <div className="text-center mb-5">
                <h1 className="fw-bold display-4 mb-2">Register Your Restaurant</h1>
                <p className="text-muted fs-4">Join our platform and start accepting reservations today</p>
            </div>

            <div className="mb-4">
                <div className="d-flex justify-content-between text-muted small mb-2 fw-semibold">
                    <span>Step {step} of 3</span>
                    <span>{progress}% complete</span>
                </div>
                <ProgressBar now={progress} variant="warning" style={{ height: '8px', backgroundColor: '#e9ecef' }} />
            </div>

            <Card className="border-0 shadow-sm p-4">
                <Card.Body>
                    <Form onSubmit={step === 3 ? submitHandler : nextStep}>

                        {/* STEP 1: BASIC INFORMATION */}
                        {step === 1 && (
                            <>
                                <h3 className="fw-bold mb-2 font-serif">Basic Information</h3>
                                <p className="text-muted mb-4">Tell us about your restaurant</p>

                                <Form.Group className="mb-4" controlId="restaurantName">
                                    <Form.Label className="fw-bold small">Restaurant Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="restaurantName"
                                        placeholder="La Bella Italia"
                                        value={formData.restaurantName}
                                        onChange={handleChange}
                                        className="py-2"
                                        required
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4" controlId="cuisineType">
                                            <Form.Label className="fw-bold small">Cuisine Type *</Form.Label>
                                            <Form.Select
                                                name="cuisineType"
                                                value={formData.cuisineType}
                                                onChange={handleChange}
                                                className="py-2"
                                                required
                                            >
                                                <option value="">Select cuisine</option>
                                                <option value="Italian">Italian</option>
                                                <option value="Chinese">Chinese</option>
                                                <option value="Indian">Indian</option>
                                                <option value="Mexican">Mexican</option>
                                                <option value="Japanese">Japanese</option>
                                                <option value="American">American</option>
                                                <option value="Thai">Thai</option>
                                                <option value="French">French</option>
                                                <option value="Mixed">Mixed / Fusion</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4" controlId="priceRange">
                                            <Form.Label className="fw-bold small">Price Range *</Form.Label>
                                            <Form.Select
                                                name="priceRange"
                                                value={formData.priceRange}
                                                onChange={handleChange}
                                                className="py-2"
                                                required
                                            >
                                                <option value="">Select range</option>
                                                <option value="$">$ (Cheap Eats)</option>
                                                <option value="$$">$$ (Moderate)</option>
                                                <option value="$$$">$$$ (Upscale)</option>
                                                <option value="$$$$">$$$$ (Fine Dining)</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4" controlId="description">
                                    <Form.Label className="fw-bold small">Description *</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        placeholder="Brief description of your restaurant"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="py-2"
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}

                        {/* STEP 2: LOCATION & CONTACT */}
                        {step === 2 && (
                            <>
                                <h3 className="fw-bold mb-2 font-serif">Location & Contact</h3>
                                <p className="text-muted mb-4">Where can customers find you?</p>

                                <Form.Group className="mb-3" controlId="streetAddress">
                                    <Form.Label className="fw-bold small">Street Address *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="streetAddress"
                                        placeholder="123 Main Street"
                                        value={formData.streetAddress}
                                        onChange={handleChange}
                                        className="py-2"
                                        required
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={5}>
                                        <Form.Group className="mb-3" controlId="city">
                                            <Form.Label className="fw-bold small">City *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                placeholder="New York"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="py-2"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3" controlId="state">
                                            <Form.Label className="fw-bold small">State *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                placeholder="NY"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="py-2"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3" controlId="zipCode">
                                            <Form.Label className="fw-bold small">ZIP Code *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="zipCode"
                                                placeholder="10001"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                className="py-2"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4" controlId="phone">
                                            <Form.Label className="fw-bold small">Phone Number *</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                placeholder="+1 (555) 123-4567"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="py-2"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4" controlId="email">
                                            <Form.Label className="fw-bold small">Email Address *</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="info@restaurant.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="py-2"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                        )}

                        {/* STEP 3: OPERATING HOURS */}
                        {step === 3 && (
                            <>
                                <h3 className="fw-bold mb-2 font-serif">Operating Hours</h3>
                                <p className="text-muted mb-4">When are you open for reservations?</p>

                                <Form.Group className="mb-4" controlId="hoursMonFri">
                                    <Form.Label className="fw-bold small">Monday - Friday</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="hoursMonFri"
                                        placeholder="5:00 PM - 10:00 PM"
                                        value={formData.hoursMonFri}
                                        onChange={handleChange}
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="hoursSat">
                                    <Form.Label className="fw-bold small">Saturday</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="hoursSat"
                                        placeholder="5:00 PM - 11:00 PM"
                                        value={formData.hoursSat}
                                        onChange={handleChange}
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="hoursSun">
                                    <Form.Label className="fw-bold small">Sunday</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="hoursSun"
                                        placeholder="4:00 PM - 9:00 PM"
                                        value={formData.hoursSun}
                                        onChange={handleChange}
                                        className="py-2"
                                    />
                                </Form.Group>

                                <div className="bg-light p-3 rounded mb-4 text-muted small">
                                    You can customize your availability and time slots in detail after registration
                                </div>
                            </>
                        )}

                        <div className="d-flex gap-3 mt-2">
                            {step > 1 && (
                                <Button
                                    variant="outline-secondary"
                                    onClick={prevStep}
                                    className="w-100 py-2 fw-bold"
                                >
                                    <i className="bi bi-arrow-left me-2"></i> Back
                                </Button>
                            )}

                            <Button
                                variant="warning"
                                type="submit"
                                className="w-100 py-2 fw-bold text-white"
                                style={{ backgroundColor: '#d35400', borderColor: '#d35400' }}
                            >
                                {step === 3 ? (
                                    <>
                                        <i className="bi bi-check2 me-2"></i> Complete Registration
                                    </>
                                ) : (
                                    <>
                                        Next <i className="bi bi-arrow-right ms-2"></i>
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RestaurantRegister;
