import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';
import ReservationTable from '../../components/owner-dashboard/ReservationTable';

// Mock Data from User's Request
const mockReservations = [
    {
        id: "1",
        customer: "John Smith",
        date: "Nov 15, 2025",
        time: "7:00 PM",
        party: 4,
        status: "Confirmed",
        phone: "+1 555-0101",
        email: "john@example.com",
    },
    {
        id: "2",
        customer: "Sarah Johnson",
        date: "Nov 15, 2025",
        time: "7:30 PM",
        party: 2,
        status: "Pending",
        phone: "+1 555-0102",
        email: "sarah@example.com",
    },
    {
        id: "3",
        customer: "Mike Davis",
        date: "Nov 16, 2025",
        time: "8:00 PM",
        party: 6,
        status: "Confirmed",
        phone: "+1 555-0103",
        email: "mike@example.com",
    },
    {
        id: "4",
        customer: "Emily Brown",
        date: "Nov 17, 2025",
        time: "6:30 PM",
        party: 3,
        status: "Pending",
        phone: "+1 555-0104",
        email: "emily@example.com",
    },
];

const ReservationsPage = () => {
    const [reservations, setReservations] = useState(mockReservations);
    const [activeTab, setActiveTab] = useState('all');

    // Filter Logic based on User's TabsContent structure
    const getFilteredReservations = () => {
        switch (activeTab) {
            case 'today':
                return reservations.slice(0, 2);
            case 'upcoming':
                return reservations.slice(2);
            case 'past':
                return [];
            case 'all':
            default:
                return reservations;
        }
    };

    const handleConfirm = (id) => {
        setReservations(reservations.map(r =>
            r.id === id ? { ...r, status: "Confirmed" } : r
        ));
        console.log('Confirmed:', id);
    };

    const handleCancel = (id) => {
        setReservations(reservations.map(r =>
            r.id === id ? { ...r, status: "Cancelled" } : r
        ));
        console.log('Cancelled:', id);
    };

    const handleContact = (id) => {
        console.log('Contact:', id);
    };

    return (
        <DashboardLayout title="Reservations">
            <div className="d-flex flex-column gap-4">
                {/* Tabs */}
                <div className="w-100">
                    <Nav variant="pills" className="bg-white p-1 rounded-3 shadow-sm d-inline-flex mb-4">
                        {['all', 'today', 'upcoming', 'past'].map((tab) => (
                            <Nav.Item key={tab}>
                                <Nav.Link
                                    eventKey={tab}
                                    active={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-3 px-4 py-2 small fw-bold text-capitalize transition-all ${activeTab === tab ? 'bg-dark text-white' : 'text-secondary hover-bg-light'}`}
                                    data-testid={`tab-${tab}`}
                                >
                                    {tab}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {/* Table Content */}
                    <div className="mt-2">
                        <ReservationTable
                            reservations={getFilteredReservations()}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                            onContact={handleContact}
                            showContactDetails={true}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ReservationsPage;
