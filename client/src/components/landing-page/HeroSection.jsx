import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import heroBg from '../../assets/hero-bg.png';

const HeroSection = () => {
    return (
        <div className="hero-section text-center d-flex align-items-center" style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '600px',
            color: 'white'
        }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <h1 className="display-3 fw-bold mb-4 text-white">Reserve Your Perfect Table</h1>
                        <p className="lead mb-5 fs-4 text-white">Discover and book the finest dining experiences in your city</p>

                        <div className="d-flex flex-column flex-md-row gap-3">
                            <div className="bg-white p-2 rounded-3 shadow-sm flex-grow-1">
                                <InputGroup className="">
                                    <InputGroup.Text className="bg-white border-0">
                                        <i className="bi bi-search"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search restaurants, cuisines..."
                                        className="border-0 shadow-none"
                                        style={{ fontSize: '1.1rem' }}
                                    />
                                </InputGroup>
                            </div>
                            <Button variant="light" size="lg" className="bg-white text-dark fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 py-3 border-0 flex-shrink-0 px-4">
                                <i className="bi bi-calendar-event"></i>
                                Find Tables
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HeroSection;
