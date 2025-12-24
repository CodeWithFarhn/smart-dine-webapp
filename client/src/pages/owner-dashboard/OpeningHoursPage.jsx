import { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';

const OpeningHoursPage = () => {
    const [schedule, setSchedule] = useState([
        { day: "Monday", open: true, slots: [{ id: "1", startTime: "17:00", endTime: "22:00" }] },
        { day: "Tuesday", open: true, slots: [{ id: "2", startTime: "17:00", endTime: "22:00" }] },
        { day: "Wednesday", open: true, slots: [{ id: "3", startTime: "17:00", endTime: "22:00" }] },
        { day: "Thursday", open: true, slots: [{ id: "4", startTime: "17:00", endTime: "22:00" }] },
        { day: "Friday", open: true, slots: [{ id: "5", startTime: "17:00", endTime: "23:00" }] },
        { day: "Saturday", open: true, slots: [{ id: "6", startTime: "17:00", endTime: "23:00" }] },
        { day: "Sunday", open: false, slots: [] },
    ]);

    const [blackoutDates, setBlackoutDates] = useState([
        { id: "1", date: "2025-12-25", reason: "Christmas" },
        { id: "2", date: "2025-01-01", reason: "New Year" },
    ]);

    const updateDayStatus = (day, open) => {
        setSchedule(schedule.map(d =>
            d.day === day ? { ...d, open, slots: open ? d.slots : [] } : d
        ));
    };

    const updateTimeSlot = (dayName, slotId, field, value) => {
        setSchedule(schedule.map(d =>
            d.day === dayName ? {
                ...d,
                slots: d.slots.map(s => s.id === slotId ? { ...s, [field]: value } : s)
            } : d
        ));
    };

    const addTimeSlot = (dayName) => {
        setSchedule(schedule.map(d =>
            d.day === dayName ? {
                ...d,
                slots: [...d.slots, { id: String(Date.now()), startTime: "17:00", endTime: "22:00" }]
            } : d
        ));
    };

    const removeTimeSlot = (dayName, slotId) => {
        setSchedule(schedule.map(d =>
            d.day === dayName ? {
                ...d,
                slots: d.slots.filter(s => s.id !== slotId)
            } : d
        ));
    };

    const addBlackoutDate = () => {
        const newDate = new Date().toISOString().split("T")[0];
        setBlackoutDates([...blackoutDates, { id: String(Date.now()), date: newDate, reason: "" }]);
    };

    const updateBlackoutDate = (id, field, value) => {
        setBlackoutDates(blackoutDates.map(d =>
            d.id === id ? { ...d, [field]: value } : d
        ));
    };

    const removeBlackoutDate = (id) => {
        setBlackoutDates(blackoutDates.filter(d => d.id !== id));
    };

    const handleSave = () => {
        console.log("Availability saved:", { schedule, blackoutDates });
        alert("Your restaurant availability has been updated.");
    };

    return (
        <DashboardLayout title="Operating Hours">
            <div className="d-flex flex-column gap-4" style={{ maxWidth: '900px' }}>

                {/* Weekly Schedule */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom py-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Weekly Schedule</h5>
                        <p className="text-secondary small mb-0">Set your operating hours for each day</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <div className="d-flex flex-column gap-4">
                            {schedule.map((day) => (
                                <div key={day.day} className="border-bottom pb-4 last-border-0">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h6 className="fw-bold mb-0">{day.day}</h6>
                                        <Form.Check
                                            type="switch"
                                            checked={day.open}
                                            onChange={(e) => updateDayStatus(day.day, e.target.checked)}
                                            style={{ fontSize: '1.2rem' }}
                                        />
                                    </div>

                                    {day.open && (
                                        <div className="ps-3 ms-2 border-start border-2">
                                            {day.slots.map((slot) => (
                                                <div key={slot.id} className="d-flex align-items-end gap-3 mb-3">
                                                    <div className="flex-grow-1">
                                                        <Form.Label className="small text-secondary mb-1">From</Form.Label>
                                                        <Form.Control
                                                            type="time"
                                                            value={slot.startTime}
                                                            onChange={(e) => updateTimeSlot(day.day, slot.id, 'startTime', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <Form.Label className="small text-secondary mb-1">To</Form.Label>
                                                        <Form.Control
                                                            type="time"
                                                            value={slot.endTime}
                                                            onChange={(e) => updateTimeSlot(day.day, slot.id, 'endTime', e.target.value)}
                                                        />
                                                    </div>
                                                    <Button
                                                        variant="link"
                                                        className="text-danger p-2 mb-1"
                                                        onClick={() => removeTimeSlot(day.day, slot.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </div>
                                            ))}

                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => addTimeSlot(day.day)}
                                                className="mt-2"
                                            >
                                                <i className="bi bi-plus me-1"></i> Add time slot
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>

                {/* Blackout Dates */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom py-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Blackout Dates</h5>
                        <p className="text-secondary small mb-0">Dates when your restaurant is closed</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <div className="d-flex flex-column gap-3 mb-4">
                            {blackoutDates.map((bd) => (
                                <div key={bd.id} className="d-flex align-items-end gap-3">
                                    <div className="flex-grow-1">
                                        <Form.Label className="small text-secondary mb-1">Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={bd.date}
                                            onChange={(e) => updateBlackoutDate(bd.id, 'date', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <Form.Label className="small text-secondary mb-1">Reason</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="e.g., Holiday"
                                            value={bd.reason}
                                            onChange={(e) => updateBlackoutDate(bd.id, 'reason', e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        variant="link"
                                        className="text-danger p-2 mb-1"
                                        onClick={() => removeBlackoutDate(bd.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="outline-secondary"
                            onClick={addBlackoutDate}
                        >
                            <i className="bi bi-plus me-1"></i> Add Blackout Date
                        </Button>
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
                        <i className="bi bi-save me-2"></i> Save Availability
                    </Button>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default OpeningHoursPage;
