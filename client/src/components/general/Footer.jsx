import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="py-5 bg-white border-top mt-auto">
            <Container>
                <Row className="gy-4 justify-content-between">
                    {/* Branding / Company Info */}
                    <Col lg={3} md={6}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div className="text-warning d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chef-hat"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path><path d="M6 17h12"></path></svg>
                            </div>
                            <span className="fw-bold fs-4 text-dark" style={{ fontFamily: 'Playfair Display, serif' }}>ReserveEase</span>
                        </div>
                        <p className="text-muted small mb-4">
                            The ultimate platform designed to help you discover and book the finest dining experiences with ease.
                        </p>
                    </Col>

                    {/* Information Policies */}
                    <Col lg={3} md={6} xs={6}>
                        <h6 className="fw-bold mb-2 text-dark footer-heading">Information Policies</h6>
                        <div className="bg-warning mb-3" style={{ width: '40px', height: '3px', borderRadius: '2px' }}></div>
                        <ul className="list-unstyled d-flex flex-column gap-2 text-muted small">
                            <li><a href="#" className="text-decoration-none text-muted">About Us</a></li>
                            <li><a href="#" className="text-decoration-none text-muted">Privacy Policy</a></li>
                            <li><a href="#" className="text-decoration-none text-muted">Terms & Conditions</a></li>
                        </ul>
                    </Col>

                    {/* Quick Links */}
                    <Col lg={2} md={6} xs={6}>
                        <h6 className="fw-bold mb-2 text-dark footer-heading">Quick Links</h6>
                        <div className="bg-warning mb-3" style={{ width: '40px', height: '3px', borderRadius: '2px' }}></div>
                        <ul className="list-unstyled d-flex flex-column gap-2 text-muted small">
                            <li><a href="#" className="text-decoration-none text-muted">Browse Restaurants</a></li>
                            <li><a href="#" className="text-decoration-none text-muted">For Restaurant Owners</a></li>
                            <li><a href="#" className="text-decoration-none text-muted">Support Center</a></li>
                            <li><a href="#" className="text-decoration-none text-muted">FAQs</a></li>
                        </ul>
                    </Col>

                    {/* Newsletter */}
                    <Col lg={4} md={6}>
                        <h6 className="fw-bold mb-2 text-dark footer-heading">Newsletter</h6>
                        <div className="bg-warning mb-3" style={{ width: '40px', height: '3px', borderRadius: '2px' }}></div>
                        <p className="text-muted small mb-3">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <Form className="d-flex flex-column gap-2" onSubmit={(e) => e.preventDefault()}>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your Email Address"
                                aria-label="Email for newsletter"
                                className="shadow-none"
                            />
                            <Button variant="dark" type="submit" className="text-uppercase fw-bold w-100 mt-1" style={{ letterSpacing: '0.05em', backgroundColor: '#2c3e50', border: 'none' }}>
                                Subscribe
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
