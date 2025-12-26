import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import heroBg from '../../assets/hero-bg.png';
import { useEffect, useState } from 'react';

const HeroSection = ({ onSearch }) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleFindTables = () => {
        navigate("/find-tables");
    };

    return (
        <div style={{ position: 'relative', minHeight: '600px', height: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

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

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .hero-content {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .hero-title {
                    animation: fadeInUp 1s ease-out 0.2s forwards;
                    opacity: 0;
                }

                .hero-subtitle {
                    animation: fadeInUp 1s ease-out 0.4s forwards;
                    opacity: 0;
                }

                .hero-search {
                    animation: fadeInUp 1s ease-out 0.6s forwards;
                    opacity: 0;
                }

                .hero-search input:focus {
                    transform: scale(1.02);
                    transition: transform 0.2s ease;
                }

                .hero-search button:hover {
                    transform: translateY(-2px);
                    transition: transform 0.2s ease;
                }
            `}</style>

            {/* Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0
            }} />

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
                zIndex: 1
            }} />

            {/* Content */}
            <Container style={{ position: 'relative', zIndex: 2, maxWidth: '850px' }} className="text-center px-4 hero-content">
                <h1 className="display-4 fw-bold text-white mb-4 font-serif hero-title">
                    Reserve Your Perfect Table
                </h1>
                <p className="fs-5 text-white opacity-75 mb-5 mx-auto hero-subtitle" style={{ maxWidth: '600px' }}>
                    Discover and book the finest dining experiences in your city
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 mx-auto hero-search" style={{ maxWidth: '650px' }}>
                    <div className="flex-grow-1 position-relative">
                        <InputGroup className="h-100">
                            <InputGroup.Text className="bg-white border-0 ps-3 bg-opacity-75">
                                <i className="bi bi-search text-muted"></i>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search restaurants, cuisines..."
                                className="border-0 py-3 shadow-none bg-white bg-opacity-75 text-dark"
                                style={{ backdropFilter: 'blur(4px)' }}
                                onChange={(e) => onSearch && onSearch(e.target.value)}
                            />
                        </InputGroup>
                    </div>

                    <Button
                        size="lg"
                        variant="light"
                        className="px-4 py-3 fw-medium d-flex align-items-center justify-content-center gap-2 border border-white border-opacity-25"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)' }}
                        onClick={handleFindTables}
                    >
                        <i className="bi bi-calendar-event"></i>
                        Find Tables
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default HeroSection;
