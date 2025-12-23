import { Container, Button } from 'react-bootstrap';

const OwnerSection = () => {
    return (
        <div className="position-relative py-5 text-center text-white" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Container>
                <h2 className="display-5 fw-bold mb-3 font-serif">Own a Restaurant?</h2>
                <p className="fs-5 mb-4 d-block mx-auto" style={{ maxWidth: '600px' }}>
                    Join our platform and manage your reservations with ease
                </p>
                <Button variant="light" size="lg" className="fw-bold px-5 rounded-pill">
                    List Your Restaurant
                </Button>
            </Container>
        </div>
    );
};

export default OwnerSection;
