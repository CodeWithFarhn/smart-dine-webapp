import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RestaurantRegister = () => {
    const navigate = useNavigate();

    // Basic form state
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Auth
        email: '',
        password: '',
        confirmPassword: '',

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
        // Validation logic could go here
        if (step === 1 && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setStep(step + 1);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Register User (Owner)
            const userResponse = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `Owner of ${formData.restaurantName}`,
                    email: formData.email,
                    password: formData.password,
                    role: 'owner'
                })
            });

            const userData = await userResponse.json();

            if (!userResponse.ok) {
                throw new Error(userData.message || 'Failed to create owner account');
            }

            // Store user info (including token)
            localStorage.setItem('userInfo', JSON.stringify(userData));

            // 2. Register Restaurant
            const restaurantResponse = await fetch('/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    name: formData.restaurantName,
                    cuisineType: formData.cuisineType,
                    priceRange: formData.priceRange,
                    description: formData.description,
                    address: {
                        street: formData.streetAddress,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode
                    },
                    phone: formData.phone,
                    email: formData.email, // Using owner email for restaurant contact for now
                    operatingHours: {
                        monFri: formData.hoursMonFri,
                        sat: formData.hoursSat,
                        sun: formData.hoursSun
                    }
                })
            });

            const restaurantData = await restaurantResponse.json();

            if (!restaurantResponse.ok) {
                throw new Error(restaurantData.message || 'Failed to register restaurant');
            }

            alert('Restaurant Registration Completed! Redirecting to Dashboard...');
            navigate('/manage/dashboard');
            window.location.reload();

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Calculate progress
    const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            <Container className="py-5" style={{ maxWidth: '800px' }}>
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5 font-serif mb-2">Partner with ReserveTable</h1>
                    <p className="text-muted fs-5">Join thousands of restaurants growing their business</p>
                </div>

                <div className="mb-4">
                    <div className="d-flex justify-content-between text-muted small mb-2 fw-bold text-uppercase warning-text-color">
                        <span>Step {step} of 3</span>
                        <span>{progress}% complete</span>
                    </div>
                    <ProgressBar now={progress} variant="dark" style={{ height: '6px', backgroundColor: '#e9ecef' }} />
                </div>

                <Card className="border-0 shadow-lg p-3 p-md-5 rounded-4">
                    <Card.Body>
                        <Form onSubmit={step === 3 ? submitHandler : nextStep}>

                            {/* STEP 1: ACCOUNT & BASIC INFO */}
                            {step === 1 && (
                                <>
                                    <h3 className="fw-bold mb-2 font-serif">Account & Details</h3>
                                    <p className="text-muted mb-4 border-bottom pb-3">Create your account and tell us about your place</p>

                                    <div className="bg-light p-4 rounded-3 mb-4">
                                        <h6 className="fw-bold mb-3 text-uppercase small text-secondary">Owner Credentials</h6>
                                        <Row>
                                            <Col md={12}>
                                                <Form.Group className="mb-3" controlId="email">
                                                    <Form.Label className="fw-bold small">Email Address *</Form.Label>
                                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required className="py-2 border-0 shadow-sm" placeholder="owner@restaurant.com" />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="password">
                                                    <Form.Label className="fw-bold small">Password *</Form.Label>
                                                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required className="py-2 border-0 shadow-sm" placeholder="••••••••" minLength={6} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="confirmPassword">
                                                    <Form.Label className="fw-bold small">Confirm Password *</Form.Label>
                                                    <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="py-2 border-0 shadow-sm" placeholder="••••••••" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>

                                    <Form.Group className="mb-4" controlId="restaurantName">
                                        <Form.Label className="fw-bold small">Restaurant Name *</Form.Label>
                                        <Form.Control type="text" name="restaurantName" placeholder="e.g. La Bella Italia" value={formData.restaurantName} onChange={handleChange} className="py-2" required />
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-4" controlId="cuisineType">
                                                <Form.Label className="fw-bold small">Cuisine Type *</Form.Label>
                                                <Form.Select name="cuisineType" value={formData.cuisineType} onChange={handleChange} className="py-2" required>
                                                    <option value="">Select cuisine</option>
                                                    <option value="Italian">Italian</option>
                                                    <option value="Chinese">Chinese</option>
                                                    <option value="Indian">Indian</option>
                                                    <option value="Mexican">Mexican</option>
                                                    <option value="American">American</option>
                                                    <option value="French">French</option>
                                                    <option value="Other">Other</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4" controlId="priceRange">
                                                <Form.Label className="fw-bold small">Price Range *</Form.Label>
                                                <Form.Select name="priceRange" value={formData.priceRange} onChange={handleChange} className="py-2" required>
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
                                        <Form.Control as="textarea" rows={3} name="description" placeholder="Brief description..." value={formData.description} onChange={handleChange} className="py-2" required />
                                    </Form.Group>
                                </>
                            )}

                            {/* STEP 2: LOCATION & CONTACT */}
                            {step === 2 && (
                                <>
                                    <h3 className="fw-bold mb-2 font-serif">Location & Contact</h3>
                                    <p className="text-muted mb-4 border-bottom pb-3">Where can customers find you?</p>

                                    <Form.Group className="mb-3" controlId="streetAddress">
                                        <Form.Label className="fw-bold small">Street Address *</Form.Label>
                                        <Form.Control type="text" name="streetAddress" placeholder="123 Main Street" value={formData.streetAddress} onChange={handleChange} className="py-2" required />
                                    </Form.Group>

                                    <Row>
                                        <Col md={5}>
                                            <Form.Group className="mb-3" controlId="city">
                                                <Form.Label className="fw-bold small">City *</Form.Label>
                                                <Form.Control type="text" name="city" placeholder="New York" value={formData.city} onChange={handleChange} className="py-2" required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mb-3" controlId="state">
                                                <Form.Label className="fw-bold small">State *</Form.Label>
                                                <Form.Control type="text" name="state" placeholder="NY" value={formData.state} onChange={handleChange} className="py-2" required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" controlId="zipCode">
                                                <Form.Label className="fw-bold small">ZIP Code *</Form.Label>
                                                <Form.Control type="text" name="zipCode" placeholder="10001" value={formData.zipCode} onChange={handleChange} className="py-2" required />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-4" controlId="phone">
                                        <Form.Label className="fw-bold small">Restaurant Phone *</Form.Label>
                                        <Form.Control type="tel" name="phone" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={handleChange} className="py-2" required />
                                    </Form.Group>
                                </>
                            )}

                            {/* STEP 3: OPERATING HOURS */}
                            {step === 3 && (
                                <>
                                    <h3 className="fw-bold mb-2 font-serif">Operating Hours</h3>
                                    <p className="text-muted mb-4 border-bottom pb-3">When are you open for reservations?</p>

                                    <Form.Group className="mb-4" controlId="hoursMonFri">
                                        <Form.Label className="fw-bold small">Monday - Friday</Form.Label>
                                        <Form.Control type="text" name="hoursMonFri" placeholder="5:00 PM - 10:00 PM" value={formData.hoursMonFri} onChange={handleChange} className="py-2" />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="hoursSat">
                                        <Form.Label className="fw-bold small">Saturday</Form.Label>
                                        <Form.Control type="text" name="hoursSat" placeholder="5:00 PM - 11:00 PM" value={formData.hoursSat} onChange={handleChange} className="py-2" />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="hoursSun">
                                        <Form.Label className="fw-bold small">Sunday</Form.Label>
                                        <Form.Control type="text" name="hoursSun" placeholder="4:00 PM - 9:00 PM" value={formData.hoursSun} onChange={handleChange} className="py-2" />
                                    </Form.Group>

                                    <Alert variant="info" className="d-flex align-items-center mb-4">
                                        <i className="bi bi-info-circle-fill me-2"></i>
                                        <span className="small">You can customize precise time slots and blackout dates in your dashboard after registration.</span>
                                    </Alert>
                                </>
                            )}

                            <div className="d-flex gap-3 mt-4 pt-3 border-top">
                                {step > 1 && (
                                    <Button variant="outline-secondary" onClick={prevStep} className="w-100 py-3 fw-bold">
                                        <i className="bi bi-arrow-left me-2"></i> Back
                                    </Button>
                                )}

                                <Button
                                    variant="dark"
                                    type="submit"
                                    className="w-100 py-3 fw-bold text-white"
                                    style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                                >
                                    {step === 3 ? (
                                        <>Complete Registration <i className="bi bi-check2 ms-2"></i></>
                                    ) : (
                                        <>Next Step <i className="bi bi-arrow-right ms-2"></i></>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default RestaurantRegister;
