import { useState } from 'react';
import { Card, Button, Form, Row, Col, Modal } from 'react-bootstrap';

const TableManagement = ({ tables, onAddTable, onUpdateTable, onDeleteTable }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTable, setNewTable] = useState({ number: '', capacity: 2 });

    const handleAddSubmit = () => {
        if (!newTable.number || !newTable.capacity) return;
        onAddTable({
            number: parseInt(newTable.number),
            capacity: parseInt(newTable.capacity)
        });
        setNewTable({ number: '', capacity: 2 });
        setShowAddModal(false);
    };

    return (
        <div className="d-flex flex-column gap-4">
            {/* Header with Add Button */}
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0 text-dark">Table Configuration</h5>
                <Button
                    variant="dark"
                    style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                    onClick={() => setShowAddModal(true)}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add Table
                </Button>
            </div>

            {/* Tables Grid */}
            <Row className="g-4">
                {tables.map((table) => (
                    <Col xs={12} md={6} lg={4} key={table.id}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body className="p-4 d-flex flex-column gap-3">
                                {/* Header: Table Name and Delete */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="fw-bold mb-0">Table {table.number}</h6>
                                    <Button
                                        variant="link"
                                        className="text-danger p-0 border-0"
                                        onClick={() => onDeleteTable(table.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </div>

                                {/* Capacity Control */}
                                <div>
                                    <label className="small text-secondary fw-bold mb-2 d-block">Capacity</label>
                                    <div className="d-flex align-items-center gap-2">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="px-2 py-1 rounded-2"
                                            onClick={() => onUpdateTable(table.id, { capacity: Math.max(1, table.capacity - 1) })}
                                        >
                                            <i className="bi bi-dash"></i>
                                        </Button>
                                        <Form.Control
                                            type="number"
                                            value={table.capacity}
                                            readOnly
                                            className="text-center border bg-light"
                                            style={{ maxWidth: '60px' }}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="px-2 py-1 rounded-2"
                                            onClick={() => onUpdateTable(table.id, { capacity: table.capacity + 1 })}
                                        >
                                            <i className="bi bi-plus"></i>
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Add Table Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton className="border-bottom-0 pb-0">
                    <Modal.Title className="fw-bold h5">Add New Table</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-3 pb-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Table Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="e.g., 5"
                                value={newTable.number}
                                onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Capacity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                placeholder="e.g., 4"
                                value={newTable.capacity}
                                onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                            />
                        </Form.Group>
                        <Button
                            variant="dark"
                            className="w-100 mt-2"
                            style={{ backgroundColor: '#d94e1e', borderColor: '#d94e1e' }}
                            onClick={handleAddSubmit}
                        >
                            Add Table
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TableManagement;
