import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg='white' variant='light' expand='lg' collapseOnSelect fixed="top" className="shadow-sm py-3 border-bottom">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className="fw-bold fs-4">
                            <i className="bi bi-cup-hot-fill text-warning me-2"></i>
                            ReserveTable
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto align-items-center'>
                            <Nav.Link href="#" className="fw-semibold me-3">For Restaurants</Nav.Link>
                            <LinkContainer to='/login'>
                                <Nav.Link className="me-2">
                                    Sign In
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                                <Button className="rounded-pill px-4 fw-bold" style={{ backgroundColor: '#2c3e50', border: 'none' }}>
                                    Sign Up
                                </Button>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
