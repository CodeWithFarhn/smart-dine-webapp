import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

const StyledBreadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Map specific path segments to prettier labels
    const labelMap = {
        'manage': 'Manage',
        'config': 'Configuration',
        'dashboard': 'Dashboard',
        'reservations': 'Reservations',
        'tables': 'Table Layout',
        'settings': 'Settings',
        'rules': 'Booking Rules',
        'hours': 'Operating Hours'
    };

    const getLabel = (segment) => labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    return (
        <Breadcrumb className="styled-breadcrumb">
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return (
                    <Breadcrumb.Item
                        linkAs={isLast ? 'span' : Link}
                        linkProps={isLast ? {} : { to }}
                        active={isLast}
                        key={to}
                        className="small"
                        style={{ fontSize: '0.85rem' }}
                    >
                        {isLast ? (
                            <span className="fw-medium text-dark">{getLabel(value)}</span>
                        ) : (
                            <span className="text-muted">{getLabel(value)}</span>
                        )}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default StyledBreadcrumb;
