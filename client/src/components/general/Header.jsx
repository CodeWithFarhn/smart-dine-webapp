import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="white" variant="light" expand="lg" collapseOnSelect className="py-3 border-bottom sticky-top shadow-sm">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="font-serif fw-bold fs-3 text-dark d-flex align-items-center gap-2">
                            <span className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: 40, height: 40, backgroundColor: '#d94e1e' }}>
                                <i className="bi bi-shop"></i>
                            </span>
                            ReserveTable
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <LinkContainer to="/find-tables">
                                <Nav.Link className="mx-2 fw-medium text-secondary">Find Tables</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/owner/login">
                                <Nav.Link className="mx-2 fw-medium text-secondary">For Restaurants</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Button variant="outline-dark" className="ms-3 rounded-pill px-4 fw-bold">Sign In</Button>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Button variant="dark" className="ms-2 rounded-pill px-4 fw-bold" style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}>Sign Up</Button>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
