import { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';
import { API_ENDPOINTS } from '../../config/api';

const TABLE_TYPES = ["Standard", "Booth", "High Top", "Outdoor"];
const SECTIONS = ["Main Dining", "Outdoor", "Private", "Bar Area", "Lounge"];

const TableConfigPage = () => {
    // Mock Data
    const [tables, setTables] = useState([]);

    // Helper to get restaurant ID
    const getRestaurantId = async (token, userId) => {
        const res = await fetch(API_ENDPOINTS.GET_RESTAURANTS, { headers: { Authorization: `Bearer ${token}` } });
        const all = await res.json();
        const myRest = all.find(r => r.owner === userId) || all[0];
        return myRest ? myRest._id : null;
    };

    // Fetch Tables
    const fetchTables = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) return;
            const restId = await getRestaurantId(userInfo.token, userInfo._id);

            if (restId) {
                const res = await fetch(API_ENDPOINTS.GET_TABLES(restId));
                const data = await res.json();
                // Map backend data to UI format if needed
                const mapped = data.map(t => ({
                    id: t._id,
                    number: t.name.replace('Table ', ''), // Assuming 'Table X' format
                    capacity: t.capacity,
                    type: t.type,
                    section: t.section
                }));
                setTables(mapped);
            }
        } catch (err) {
            console.error("Failed to fetch tables", err);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);


    const [newTable, setNewTable] = useState({
        number: "",
        capacity: "",
        type: "Standard",
        section: "Main Dining",
    });

    const addTable = async () => {
        if (!newTable.number || !newTable.capacity) {
            alert("Error: Please fill in all fields");
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const restId = await getRestaurantId(userInfo.token, userInfo._id);

            if (!restId) return alert("No restaurant found");

            const res = await fetch('/api/tables', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    number: newTable.number,
                    capacity: newTable.capacity,
                    type: newTable.type,
                    section: newTable.section,
                    restaurantId: restId
                })
            });

            if (res.ok) {
                fetchTables(); // Refresh list
                setNewTable({ number: "", capacity: "", type: "Standard", section: "Main Dining" });
            } else {
                alert("Failed to add table");
            }
        } catch (err) {
            console.error(err);
            alert("Error adding table");
        }
    };

    const deleteTable = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            await fetch(`/api/tables/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            fetchTables(); // Refresh
        } catch (err) {
            console.error(err);
        }
    };

    const groupedTables = SECTIONS.reduce((acc, section) => {
        acc[section] = tables.filter(t => t.section === section);
        return acc;
    }, {});

    return (
        <DashboardLayout title="Table Configuration">
            <div className="d-flex flex-column gap-4">

                {/* Add Table Form */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-bottom pt-4 pb-3 px-4">
                        <h5 className="font-serif fw-bold mb-1">Add New Table</h5>
                        <p className="text-secondary small mb-0">Create a new table for your restaurant</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row className="g-4 mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Table Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        placeholder="e.g., 1"
                                        value={newTable.number}
                                        onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Capacity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="20"
                                        placeholder="e.g., 4"
                                        value={newTable.capacity}
                                        onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Table Type</Form.Label>
                                    <Form.Select
                                        value={newTable.type}
                                        onChange={(e) => setNewTable({ ...newTable, type: e.target.value })}
                                    >
                                        {TABLE_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold">Section</Form.Label>
                                    <Form.Select
                                        value={newTable.section}
                                        onChange={(e) => setNewTable({ ...newTable, section: e.target.value })}
                                    >
                                        {SECTIONS.map((section) => (
                                            <option key={section} value={section}>
                                                {section}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            variant="dark"
                            style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                            onClick={addTable}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Add Table
                        </Button>
                    </Card.Body>
                </Card>

                {/* Tables by Section */}
                <div className="d-flex flex-column gap-4">
                    {Object.entries(groupedTables).map(([section, sectionTables]) => (
                        <Card key={section} className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-bottom py-3 px-4">
                                <h6 className="font-serif fw-bold mb-0">{section}</h6>
                            </Card.Header>
                            <Card.Body className="p-4">
                                {sectionTables.length === 0 ? (
                                    <p className="text-secondary small mb-0">No tables in this section</p>
                                ) : (
                                    <div className="d-flex flex-column gap-3">
                                        {sectionTables.map((table) => (
                                            <div
                                                key={table.id}
                                                className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light border"
                                            >
                                                <div>
                                                    <p className="fw-bold mb-0 text-dark">Table {table.number}</p>
                                                    <p className="small text-secondary mb-0">
                                                        {table.capacity} seats • {table.type}
                                                    </p>
                                                </div>

                                                <Button
                                                    variant="link"
                                                    className="text-danger p-2 hover-bg-danger-subtle rounded-circle"
                                                    onClick={() => deleteTable(table.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </div>



            </div>
        </DashboardLayout>
    );
};

export default TableConfigPage;
