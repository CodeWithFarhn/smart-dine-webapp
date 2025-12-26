import { Container, Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';

const OwnerSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
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
        <div ref={sectionRef} className="position-relative py-5 text-center text-white" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
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

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }

                .owner-title {
                    animation: ${isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'};
                    opacity: ${isVisible ? 1 : 0};
                }

                .owner-subtitle {
                    animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.2s forwards' : 'none'};
                    opacity: ${isVisible ? 1 : 0};
                }

                .owner-button {
                    animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.4s forwards' : 'none'};
                    opacity: ${isVisible ? 1 : 0};
                    transition: all 0.3s ease;
                }

                .owner-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(255, 255, 255, 0.3);
                }
            `}</style>
            <Container>
                <h2 className="display-5 fw-bold mb-3 font-serif owner-title">Own a Restaurant?</h2>
                <p className="fs-5 mb-4 d-block mx-auto owner-subtitle" style={{ maxWidth: '600px' }}>
                    Join our platform and manage your reservations with ease
                </p>
                <Button variant="light" size="lg" className="fw-bold px-5 rounded-pill owner-button">
                    List Your Restaurant
                </Button>
            </Container>
        </div>
    );
};

export default OwnerSection;
