import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';

const HowItWorks = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className="bg-light py-5" ref={sectionRef}>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .how-it-works-title {
                    animation: ${isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'};
                    opacity: ${isVisible ? 1 : 0};
                }

                .how-it-works-card {
                    opacity: ${isVisible ? 1 : 0};
                    transition: transform 0.3s ease;
                }

                .how-it-works-card:nth-child(1) {
                    animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.2s forwards' : 'none'};
                }

                .how-it-works-card:nth-child(2) {
                    animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.4s forwards' : 'none'};
                }

                .how-it-works-card:nth-child(3) {
                    animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.6s forwards' : 'none'};
                }

                .how-it-works-card:hover {
                    transform: translateY(-10px);
                }

                .icon-circle {
                    animation: ${isVisible ? 'scaleIn 0.6s ease-out forwards' : 'none'};
                    transition: transform 0.3s ease;
                }

                .icon-circle:hover {
                    transform: rotate(10deg) scale(1.1);
                }
            `}</style>
            <Container>
                <div className="text-center mb-5 how-it-works-title">
                    <h2 className="fw-bold font-serif">How It Works</h2>
                    <p className="text-muted">Book your perfect table in three simple steps</p>
                </div>

                <Row className="text-center">
                    <Col md={4} className="mb-4 how-it-works-card">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="rounded-circle bg-orange-light p-4 d-flex align-items-center justify-content-center icon-circle" style={{ width: '80px', height: '80px', backgroundColor: '#ffeec2' }}>
                                <i className="bi bi-search fs-2 text-warning"></i>
                            </div>
                        </div>
                        <h5 className="fw-bold font-serif">Discover Restaurants</h5>
                        <p className="text-muted small px-4">Browse curated dining experiences from the finest restaurants in your area</p>
                    </Col>
                    <Col md={4} className="mb-4 how-it-works-card">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="rounded-circle bg-orange-light p-4 d-flex align-items-center justify-content-center icon-circle" style={{ width: '80px', height: '80px', backgroundColor: '#ffeec2' }}>
                                <i className="bi bi-clock fs-2 text-warning"></i>
                            </div>
                        </div>
                        <h5 className="fw-bold font-serif">Real-Time Availability</h5>
                        <p className="text-muted small px-4">See live table availability and book instantly without waiting</p>
                    </Col>
                    <Col md={4} className="mb-4 how-it-works-card">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="rounded-circle bg-orange-light p-4 d-flex align-items-center justify-content-center icon-circle" style={{ width: '80px', height: '80px', backgroundColor: '#ffeec2' }}>
                                <i className="bi bi-shield-check fs-2 text-warning"></i>
                            </div>
                        </div>
                        <h5 className="fw-bold font-serif">Secure Bookings</h5>
                        <p className="text-muted small px-4">Your reservations are confirmed instantly with email notifications</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HowItWorks;
