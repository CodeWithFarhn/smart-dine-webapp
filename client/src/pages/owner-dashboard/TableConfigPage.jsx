import { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import DashboardLayout from '../../components/owner-dashboard/DashboardLayout';

const TABLE_TYPES = ["standard", "booth", "window", "bar"];
const SECTIONS = ["Main Dining", "Outdoor", "Private", "Bar Area", "Lounge"];

const TableConfigPage = () => {
    // Mock Data
    const [tables, setTables] = useState([
        { id: "1", number: 1, capacity: 2, type: "standard", section: "Main Dining" },
        { id: "2", number: 2, capacity: 4, type: "standard", section: "Main Dining" },
        { id: "3", number: 3, capacity: 4, type: "booth", section: "Main Dining" },
        { id: "4", number: 4, capacity: 6, type: "standard", section: "Outdoor" },
        { id: "5", number: 5, capacity: 8, type: "standard", section: "Private" },
        { id: "6", number: 6, capacity: 2, type: "window", section: "Main Dining" },
    ]);

    const [newTable, setNewTable] = useState({
        number: "",
        capacity: "",
        type: "standard",
        section: "Main Dining",
    });

    const addTable = () => {
        if (!newTable.number || !newTable.capacity) {
            alert("Error: Please fill in all fields"); // Replaced toast with alert for now as per stack
            return;
        }

        const table = {
            id: String(Date.now()),
            number: parseInt(newTable.number),
            capacity: parseInt(newTable.capacity),
            type: newTable.type,
            section: newTable.section,
        };

        setTables([...tables, table]);
        setNewTable({ number: "", capacity: "", type: "standard", section: "Main Dining" });
    };

    const deleteTable = (id) => {
        setTables(tables.filter(t => t.id !== id));
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
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
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

                <div className="mb-5">
                    <Button
                        variant="dark"
                        style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                        size="lg"
                        className="w-100" // Optional: make it full width or fixed width as per preference, sticking to consistent styling
                        onClick={() => console.log('Settings saved')}
                    >
                        <i className="bi bi-save me-2"></i>
                        Save All Changes
                    </Button>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default TableConfigPage;
