import { useState } from 'react';
import { Button } from 'react-bootstrap';

const VisualTableSelector = ({ onSelectTable, selectedTableId }) => {
    // Mock floor plan data
    const tables = [
        { id: 't1', name: 'Table 1', type: 'Window', seats: 2, x: 10, y: 10, status: 'available' },
        { id: 't2', name: 'Table 2', type: 'Window', seats: 2, x: 10, y: 40, status: 'occupied' },
        { id: 't3', name: 'Table 3', type: 'Standard', seats: 4, x: 40, y: 25, status: 'available' },
        { id: 't4', name: 'Table 4', type: 'Standard', seats: 4, x: 40, y: 60, status: 'available' },
        { id: 't5', name: 'Booth 1', type: 'Booth', seats: 6, x: 75, y: 15, status: 'available' },
        { id: 't6', name: 'Booth 2', type: 'Booth', seats: 6, x: 75, y: 50, status: 'reserved' },
    ];

    return (
        <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h4 className="font-serif fw-bold mb-1">Select Your Table</h4>
                    <p className="text-muted small mb-0">Click on an available table to select it</p>
                </div>
                <div className="d-flex gap-3 small">
                    <div className="d-flex align-items-center gap-1"><div className="rounded-circle border" style={{ width: 12, height: 12, bg: 'white' }}></div> Available</div>
                    <div className="d-flex align-items-center gap-1"><div className="rounded-circle bg-secondary opacity-25" style={{ width: 12, height: 12 }}></div> Occupied</div>
                    <div className="d-flex align-items-center gap-1"><div className="rounded-circle" style={{ width: 12, height: 12, backgroundColor: '#d94e1e' }}></div> Selected</div>
                </div>
            </div>

            {/* Floor Plan Container */}
            <div className="position-relative bg-light rounded-3 border" style={{ height: '400px', overflow: 'hidden' }}>
                {/* Decorative Elements (Entrance, Kitchen) */}
                <div className="position-absolute text-muted small fw-bold text-uppercase" style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>Entrance</div>
                <div className="position-absolute bg-secondary opacity-10 h-100" style={{ right: 0, width: '40px' }}></div>
                <div className="position-absolute text-muted small fw-bold text-uppercase text-center" style={{ top: '50%', right: 5, transform: 'translateY(-50%) rotate(90deg)', whiteSpace: 'nowrap' }}>Kitchen & Bar</div>

                {/* Tables */}
                {tables.map((table) => {
                    const isSelected = selectedTableId === table.id;
                    const isAvailable = table.status === 'available';

                    let bg = '#fff';
                    let border = '#dee2e6';
                    let cursor = 'not-allowed';
                    let color = '#6c757d';

                    if (isAvailable) {
                        bg = isSelected ? '#d94e1e' : '#fff';
                        border = isSelected ? '#d94e1e' : '#2c3e50';
                        cursor = 'pointer';
                        color = isSelected ? '#fff' : '#2c3e50';
                    } else {
                        bg = '#e9ecef';
                        border = '#dee2e6';
                        color = '#adb5bd';
                    }

                    return (
                        <div
                            key={table.id}
                            onClick={() => isAvailable && onSelectTable(table)}
                            className={`d-flex flex-column align-items-center justify-content-center shadow-sm transition-all ${isAvailable ? 'hover-scale' : ''}`}
                            style={{
                                position: 'absolute',
                                left: `${table.x}%`,
                                top: `${table.y}%`,
                                width: table.seats > 4 ? '80px' : '60px',
                                height: table.seats > 4 ? '50px' : '60px', // Booths are rects, Tables are rounds
                                borderRadius: table.type === 'Booth' ? '8px' : '50%',
                                backgroundColor: bg,
                                border: `2px solid ${border}`,
                                color: color,
                                cursor: cursor,
                                zIndex: 10,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <small className="fw-bold" style={{ fontSize: '0.7em' }}>{table.name}</small>
                            <small style={{ fontSize: '0.6em' }}>{table.seats} Seats</small>
                        </div>
                    );
                })}
            </div>
            <style>
                {`
                    .hover-scale:hover {
                        transform: scale(1.1);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    }
                `}
            </style>
        </div>
    );
};

export default VisualTableSelector;
