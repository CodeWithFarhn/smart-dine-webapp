import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, imageSrc = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" }) => {
    return (
        <div className="d-flex min-vh-100 bg-light">
            {/* Left Side - Image (Hidden on mobile) */}
            <div className="d-none d-lg-block col-lg-6 position-relative p-0 overflow-hidden">
                <div
                    className="position-absolute w-100 h-100"
                    style={{
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="position-absolute w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-absolute bottom-0 start-0 p-5 text-white">
                        <h2 className="display-4 fw-bold font-serif mb-3">ReserveTable</h2>
                        <p className="fs-5 opacity-75">Experience the best dining, curated just for you.</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
                <div style={{ maxWidth: '450px', width: '100%' }}>
                    <div className="text-center mb-4 d-lg-none">
                        <h2 className="fw-bold font-serif text-primary">ReserveTable</h2>
                    </div>

                    <Card className="border-0 shadow-lg p-4 p-md-5 rounded-4">
                        <div className="mb-4 text-center">
                            <h1 className="fw-bold font-serif mb-2">{title}</h1>
                            {subtitle && <p className="text-secondary">{subtitle}</p>}
                        </div>
                        {children}
                    </Card>

                    <div className="text-center mt-4">
                        <p className="small text-secondary">
                            &copy; {new Date().getFullYear()} ReserveTable. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
