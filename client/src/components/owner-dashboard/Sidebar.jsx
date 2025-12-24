import { Nav } from 'react-bootstrap';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../general/StyledAvatar';

const Sidebar = () => {
    const location = useLocation();

    // Function to check if a path is active
    const isActive = (path) => location.pathname === path;

    const NavGroupLabel = ({ label }) => (
        <div className="px-3 mb-2 mt-4 text-xs font-semibold text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
            {label}
        </div>
    );

    const NavItem = ({ to, icon, label }) => (
        <Nav.Link
            as={NavLink}
            to={to}
            className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-1 transition-all ${isActive(to)
                ? 'bg-primary-subtle text-primary fw-bold'
                : 'text-secondary hover-bg-light'
                }`}
            style={{
                fontSize: '0.95rem',
                color: isActive(to) ? '#d94e1e' : '#64748b',
                backgroundColor: isActive(to) ? '#fff5f2' : 'transparent',
                transition: 'all 0.2s ease'
            }}
        >
            <i className={`bi ${icon}`} style={{ fontSize: '1.1rem' }}></i>
            <span>{label}</span>
        </Nav.Link>
    );

    return (
        <div className="bg-white border-end h-100 d-flex flex-column" style={{ width: '100%', minHeight: '100vh', overflowY: 'auto' }}>
            {/* Brand */}
            <div className="px-4 border-bottom d-flex align-items-center" style={{ height: '70px' }}>
                <NavLink to="/" className="text-decoration-none d-flex align-items-center gap-2">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm" style={{ width: 32, height: 32, backgroundColor: '#d94e1e' }}>
                        <i className="bi bi-shop-window" style={{ fontSize: '0.9rem' }}></i>
                    </div>
                    <span className="font-serif fw-bold text-dark fs-5">ReserveTable</span>
                </NavLink>
            </div>

            {/* Navigation */}
            <div className="flex-grow-1 px-3 py-3">
                <Nav className="flex-column">
                    {/* Main Group */}
                    <NavGroupLabel label="Main" />
                    <NavItem to="/manage/dashboard" icon="bi-grid-1x2" label="Dashboard" />
                    <NavItem to="/manage/reservations" icon="bi-calendar-check" label="Reservations" />
                    <NavItem to="/manage/tables" icon="bi-layout-sidebar" label="Tables" />
                    <NavItem to="/manage/settings" icon="bi-gear" label="Settings" />

                    {/* Configuration Group */}
                    <NavGroupLabel label="Configuration" />
                    <NavItem to="/manage/config/tables" icon="bi-grid-3x3" label="Table Configuration" />
                    <NavItem to="/manage/config/rules" icon="bi-clipboard-check" label="Booking Rules" />
                    <NavItem to="/manage/config/hours" icon="bi-clock" label="Operating Hours" />
                </Nav>
            </div>

            {/* Footer / User Profile */}
            <div className="mt-auto pt-3 border-top">
                <div className="d-flex align-items-center gap-3 px-2 mb-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <p className="mb-0 fw-bold text-dark text-truncate">John Doe</p>
                        <p className="mb-0 small text-secondary text-truncate">Owner / Manager</p>
                    </div>
                </div>

                <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-3 px-3 py-2 text-dark rounded-3 hover-bg-light">
                    <i className="bi bi-box-arrow-right text-muted"></i>
                    <span className="text-muted fw-medium">Logout</span>
                </Nav.Link>
            </div>
        </div>
    );
};

export default Sidebar;
