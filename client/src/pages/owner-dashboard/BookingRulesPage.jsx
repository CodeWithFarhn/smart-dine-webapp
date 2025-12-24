import { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';

const BookingRulesPage = () => {
    const [rules, setRules] = useState({
        minPartySize: 1,
        maxPartySize: 12,
        reservationDuration: 90,
        minAdvanceBooking: 15,
        maxAdvanceBooking: 90,
        allowExactFit: true,
        allowOverCapacity: true,
        overCapacityThreshold: 10,
        allowPartialBooking: true,
        orphanSeatThreshold: 2,
        peakHourStart: "18:00",
        peakHourEnd: "21:00",
        allowWalkIns: true,
        phoneConfirmationRequired: false,
    });
    const [restaurantId, setRestaurantId] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) return;

            // Get restaurant
            const restRes = await fetch(`/api/restaurants`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
            const all = await res.json();
            const myRest = all.find(r => r.owner === userInfo._id) || all[0];

            if (myRest) {
                setRestaurantId(myRest._id);
                if (myRest.bookingSettings) {
                    setRules(prev => ({ ...prev, ...myRest.bookingSettings }));
                }
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        if (!restaurantId) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const res = await fetch(`/api/restaurants/${restaurantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ bookingSettings: rules })
            });

            if (res.ok) {
                alert("Your booking rules have been updated.");
            } else {
                alert("Failed to save rules.");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving rules.");
        }
    };

    return (
        <DashboardLayout title="Booking Rules">
            <div className="d-flex flex-column gap-4" style={{ maxWidth: '900px' }}>

                {/* Party Size Rules */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom py-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Party Size Rules</h5>
                        <p className="text-secondary small mb-0">Set minimum and maximum party sizes</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <div className="d-flex flex-column gap-3">
                            <div>
                                <Form.Label className="small fw-bold">Minimum Party Size</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={rules.minPartySize}
                                    onChange={(e) => setRules({ ...rules, minPartySize: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <Form.Label className="small fw-bold">Maximum Party Size</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={rules.maxPartySize}
                                    onChange={(e) => setRules({ ...rules, maxPartySize: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Reservation Duration */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom py-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Reservation Duration</h5>
                        <p className="text-secondary small mb-0">How long each reservation slot lasts</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Form.Label className="small fw-bold">Duration (minutes)</Form.Label>
                        <Form.Select
                            value={String(rules.reservationDuration)}
                            onChange={(e) => setRules({ ...rules, reservationDuration: parseInt(e.target.value) })}
                        >
                            {[30, 60, 90, 120, 150, 180].map((duration) => (
                                <option key={duration} value={String(duration)}>
                                    {duration} minutes
                                </option>
                            ))}
                        </Form.Select>
                    </Card.Body>
                </Card>

                {/* Advance Booking Window */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom py-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Advance Booking Window</h5>
                        <p className="text-secondary small mb-0">How far in advance customers can book</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <div className="d-flex flex-column gap-3">
                            <div>
                                <Form.Label className="small fw-bold">Minimum Advance (minutes)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={rules.minAdvanceBooking}
                                    onChange={(e) => setRules({ ...rules, minAdvanceBooking: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <Form.Label className="small fw-bold">Maximum Advance (days)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={rules.maxAdvanceBooking}
                                    onChange={(e) => setRules({ ...rules, maxAdvanceBooking: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Seating Flexibility */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom py-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Seating Flexibility</h5>
                        <p className="text-secondary small mb-0">Configure how flexible your seating can be</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Form.Label className="fw-bold mb-0">Exact-fit table preference</Form.Label>
                                    <small className="text-secondary d-block">Only book tables matching party size exactly</small>
                                </div>
                                <Form.Check
                                    type="switch"
                                    checked={rules.allowExactFit}
                                    onChange={(e) => setRules({ ...rules, allowExactFit: e.target.checked })}
                                />
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Form.Label className="fw-bold mb-0">Allow over-capacity seating</Form.Label>
                                    <small className="text-secondary d-block">Book tables larger than party size</small>
                                </div>
                                <Form.Check
                                    type="switch"
                                    checked={rules.allowOverCapacity}
                                    onChange={(e) => setRules({ ...rules, allowOverCapacity: e.target.checked })}
                                />
                            </div>

                            {rules.allowOverCapacity && (
                                <div className="bg-light p-3 rounded-3">
                                    <Form.Label className="small fw-bold">Over-capacity Threshold (%)</Form.Label>
                                    <Form.Range
                                        value={rules.overCapacityThreshold}
                                        onChange={(e) => setRules({ ...rules, overCapacityThreshold: parseInt(e.target.value) })}
                                        min={0}
                                        max={50}
                                        step={5}
                                    />
                                    <small className="text-secondary">{rules.overCapacityThreshold}% threshold</small>
                                </div>
                            )}

                            <hr className="my-0 text-muted opacity-25" />

                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Form.Label className="fw-bold mb-0">Allow partial booking</Form.Label>
                                    <small className="text-secondary d-block">Combine multiple tables for large parties</small>
                                </div>
                                <Form.Check
                                    type="switch"
                                    checked={rules.allowPartialBooking}
                                    onChange={(e) => setRules({ ...rules, allowPartialBooking: e.target.checked })}
                                />
                            </div>

                            {rules.allowPartialBooking && (
                                <div className="bg-light p-3 rounded-3">
                                    <Form.Label className="small fw-bold">Orphan Seat Threshold</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={rules.orphanSeatThreshold}
                                        onChange={(e) => setRules({ ...rules, orphanSeatThreshold: parseInt(e.target.value) })}
                                    />
                                    <small className="text-secondary">Maximum seats left unused when combining tables</small>
                                </div>
                            )}
                        </div>
                    </Card.Body>
                </Card>

                {/* Peak Hours */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom py-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Peak Hours</h5>
                        <p className="text-secondary small mb-0">Define your busy periods</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Label className="small fw-bold">Peak Hour Start</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={rules.peakHourStart}
                                    onChange={(e) => setRules({ ...rules, peakHourStart: e.target.value })}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label className="small fw-bold">Peak Hour End</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={rules.peakHourEnd}
                                    onChange={(e) => setRules({ ...rules, peakHourEnd: e.target.value })}
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Additional Policies */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom py-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Additional Policies</h5>
                        <p className="text-secondary small mb-0">Configure other booking policies</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Form.Label className="fw-bold mb-0">Allow walk-ins</Form.Label>
                                    <small className="text-secondary d-block">Accept walk-in reservations</small>
                                </div>
                                <Form.Check
                                    type="switch"
                                    checked={rules.allowWalkIns}
                                    onChange={(e) => setRules({ ...rules, allowWalkIns: e.target.checked })}
                                />
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Form.Label className="fw-bold mb-0">Phone confirmation required</Form.Label>
                                    <small className="text-secondary d-block">Require phone verification for bookings</small>
                                </div>
                                <Form.Check
                                    type="switch"
                                    checked={rules.phoneConfirmationRequired}
                                    onChange={(e) => setRules({ ...rules, phoneConfirmationRequired: e.target.checked })}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <div className="mb-5">
                    <Button
                        variant="dark"
                        style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                        size="lg"
                        className="w-100"
                        onClick={handleSave}
                    >
                        <i className="bi bi-save me-2"></i> Save Rules
                    </Button>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default BookingRulesPage;
