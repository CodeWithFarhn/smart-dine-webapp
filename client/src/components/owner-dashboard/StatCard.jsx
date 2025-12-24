import React from 'react';
import { Card } from 'react-bootstrap';

const StatCard = ({ label, value, icon, change, variant = 'white' }) => {
    // Determine trend direction and color based on change string
    // This is a simple heuristic: "+" implies positive/success, "-" or neutral
    const isPositive = change?.includes('+');
    const changeColor = isPositive ? 'text-success' : 'text-secondary';

    // Split change text (e.g., "+12% from yesterday")
    const changeValue = change?.split(' ')[0] || '';
    const changeLabel = change?.substring(change.indexOf(' ') + 1) || '';

    return (
        <Card className={`border-0 shadow-sm h-100 rounded-4 bg-${variant}`}>
            <Card.Body className="p-4 d-flex flex-column justify-content-between" style={{ minHeight: '140px' }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <div className="text-secondary small fw-bold mb-2">{label}</div>
                        <div className={`fs-2 fw-bold lh-1 mb-2 ${variant === 'dark' ? 'text-white' : 'text-dark'}`}>{value}</div>
                    </div>
                    {icon && (
                        <i className={`bi ${icon} fs-5 ${variant === 'dark' ? 'text-white-50' : 'text-muted'}`}></i>
                    )}
                </div>
                {change && (
                    <div className="small text-muted">
                        <span className={`${changeColor} fw-bold me-1`}>{changeValue}</span>
                        <span className={variant === 'dark' ? 'text-white-50' : 'text-secondary'}> {changeLabel}</span>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default StatCard;
