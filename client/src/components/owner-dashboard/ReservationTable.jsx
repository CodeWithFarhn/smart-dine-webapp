import React from 'react';
import { Table, Badge, Dropdown, Button } from 'react-bootstrap';

const ReservationTable = ({
    reservations,
    onConfirm,
    onCancel,
    onContact,
    showContactDetails = false
}) => {

    const renderStatusBadge = (status) => {
        const commonStyle = {
            width: '100px',
            display: 'inline-block',
            textAlign: 'center'
        };

        if (status === 'Confirmed') {
            return (
                <span className="badge rounded-pill fw-medium px-3 py-2" style={{ ...commonStyle, backgroundColor: '#d94e1e', color: 'white', border: '1px solid #d94e1e' }}>
                    confirmed
                </span>
            );
        } else if (status === 'Pending') {
            return (
                <span className="badge rounded-pill fw-medium px-3 py-2" style={{ ...commonStyle, backgroundColor: '#e9ecef', color: '#495057', border: '1px solid #e9ecef' }}>
                    pending
                </span>
            );
        } else if (status === 'Cancelled') {
            return (
                <span className="badge rounded-pill fw-medium px-3 py-2" style={{ ...commonStyle, backgroundColor: '#dc3545', color: 'white', border: '1px solid #dc3545' }}>
                    cancelled
                </span>
            );
        }
        return <span className="badge bg-secondary">{status}</span>;
    };

    // Custom Toggle for Dropdown
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Button
            ref={ref}
            variant="link"
            className="text-secondary p-0 border-0"
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </Button>
    ));

    return (
        <div className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <Table responsive hover className="mb-0 align-middle" style={{ borderCollapse: 'collapse' }}>
                <thead className="bg-white">
                    <tr style={{ whiteSpace: 'nowrap' }}>
                        <th className="px-4 py-3 text-secondary small fw-bold border-bottom">Customer</th>
                        <th className="py-3 text-secondary small fw-bold border-bottom">Date</th>
                        <th className="py-3 text-secondary small fw-bold border-bottom">Time</th>
                        <th className="py-3 text-secondary small fw-bold border-bottom">Party Size</th>
                        {showContactDetails && (
                            <th className="py-3 text-secondary small fw-bold border-bottom">Contact</th>
                        )}
                        <th className="py-3 text-secondary small fw-bold border-bottom">Status</th>
                        <th className="px-4 py-3 text-secondary small fw-bold border-bottom text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length === 0 ? (
                        <tr>
                            <td colSpan={showContactDetails ? 6 : 5} className="text-center py-5 text-muted">
                                <i className="bi bi-inbox fs-1 d-block mb-3 opacity-50"></i>
                                No reservations found.
                            </td>
                        </tr>
                    ) : (
                        reservations.map(res => (
                            <tr key={res.id} style={{ borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>
                                <td className="px-4 py-3">
                                    <div className="fw-medium text-dark">{res.customer}</div>
                                    {showContactDetails && <div className="small text-muted d-md-none">{res.email}</div>}
                                </td>
                                <td>
                                    <div className="text-secondary fw-medium">{res.date}</div>
                                </td>
                                <td>
                                    <div className="small text-muted">{res.time}</div>
                                </td>
                                <td className="text-secondary ps-4">{res.party}</td>
                                {showContactDetails && (
                                    <td>
                                        <div className="text-secondary small"><i className="bi bi-envelope me-1"></i> {res.email || '-'}</div>
                                        <div className="text-secondary small"><i className="bi bi-phone me-1"></i> {res.phone || '-'}</div>
                                    </td>
                                )}
                                <td>
                                    {renderStatusBadge(res.status)}
                                </td>
                                <td className="px-4 text-end">
                                    <Dropdown align="end">
                                        <Dropdown.Toggle as={CustomToggle} id={`dropdown-${res.id}`}>
                                            <i className="bi bi-three-dots-vertical fs-5"></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="border-0 shadow rounded-3 p-2" style={{ minWidth: '180px' }}>
                                            {res.status === 'Pending' && (
                                                <Dropdown.Item
                                                    onClick={() => onConfirm && onConfirm(res.id)}
                                                    className="d-flex align-items-center gap-2 py-2 rounded-2 text-dark"
                                                >
                                                    <i className="bi bi-check2"></i> Confirm
                                                </Dropdown.Item>
                                            )}

                                            {res.status !== 'Cancelled' && (
                                                <Dropdown.Item
                                                    onClick={() => onCancel && onCancel(res.id)}
                                                    className="d-flex align-items-center gap-2 py-2 rounded-2 text-danger"
                                                >
                                                    <i className="bi bi-x-lg"></i> Cancel
                                                </Dropdown.Item>
                                            )}

                                            <Dropdown.Item
                                                onClick={() => onContact && onContact(res.id)}
                                                className="d-flex align-items-center gap-2 py-2 rounded-2 text-dark"
                                            >
                                                <i className="bi bi-telephone"></i> Contact
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ReservationTable;
