import { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';
import ReservationTable from '../../components/owner-dashboard/ReservationTable';
import { API_ENDPOINTS } from '../../config/api';

// Mock Data from User's Request
// Mock Data removed - using API


const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    // Fetch Reservations
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                // In a real app we'd get the restaurant ID from the user info or a separate API call
                // For this demo/MVP, we'll assume the user object includes the restaurant ID or we fetch it
                // TEMPORARY: Fetch the first restaurant owned by this user
                const restRes = await fetch(API_ENDPOINTS.GET_RESTAURANTS, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                const restaurants = await restRes.json();
                // Find restaurant owned by this user (mock logic if API doesn't filter perfectly yet)
                const myRestaurant = restaurants.find(r => r.owner === userInfo._id) || restaurants[0]; // Fallback

                if (myRestaurant) {
                    const res = await fetch(API_ENDPOINTS.GET_RESTAURANT_RESERVATIONS(myRestaurant._id), {
                        headers: { Authorization: `Bearer ${userInfo.token}` }
                    });
                    const data = await res.json();

                    // Map backend data to UI format
                    const mappedData = data.map(r => ({
                        id: r._id,
                        customer: r.customerName,
                        date: r.date,
                        time: r.time,
                        party: r.partySize,
                        status: r.status || 'Pending',
                        phone: r.customerPhone,
                        email: r.customerEmail
                    }));
                    setReservations(mappedData);
                }
            } catch (error) {
                console.error("Failed to fetch reservations", error);
            }
        };

        fetchReservations();
    }, []);

    // Filter Logic based on User's TabsContent structure
    const getFilteredReservations = () => {
        switch (activeTab) {
            case 'today':
                // Simple string match for MVP date filtering
                const today = new Date().toISOString().split('T')[0];
                return reservations.filter(r => r.date === today);
            case 'upcoming':
                return reservations.filter(r => r.status !== 'Cancelled' && r.status !== 'Completed');
            case 'past':
                return reservations.filter(r => r.status === 'Completed');
            case 'all':
            default:
                return reservations;
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            await fetch(`/api/reservations/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ status })
            });

            // Optimistic update
            setReservations(reservations.map(r =>
                r.id === id ? { ...r, status } : r
            ));
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        }
    };

    const handleConfirm = (id) => updateStatus(id, "Confirmed");
    const handleCancel = (id) => updateStatus(id, "Cancelled");

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
