import React from 'react';
import { Badge } from 'react-bootstrap';

const StyledBadge = ({
    variant = "default",
    className = "",
    children,
    ...props
}) => {
    // Map variants to specific styles
    // We use standard Bootstrap classes where possible, or inline styles for specific shadcn mimics

    let badgeClass = "fw-semibold px-2 py-1 rounded-md "; // rounded-md is not standard bootstrap, use rounded (which is roughly md)
    let style = { fontSize: '0.75rem', letterSpacing: '0.02em', lineHeight: '1' };

    switch (variant) {
        case 'secondary':
            // secondary: bg-secondary text-secondary-foreground
            badgeClass += "bg-secondary-subtle text-secondary-emphasis border-0";
            break;
        case 'destructive':
            // destructive: bg-destructive text-destructive-foreground
            badgeClass += "bg-danger text-white border-0 shadow-sm";
            break;
        case 'outline':
            // outline: border
            badgeClass += "bg-transparent border text-dark";
            break;
        case 'default':
        default:
            // default: bg-primary text-primary-foreground
            // Using dark to match the "premium" black look often associated with shadcn default
            badgeClass += "bg-dark text-white border-0 shadow-sm";
            break;
    }

    return (
        <Badge
            bg={null} // We rely on classNames for bg to support subtle/custom
            className={`${badgeClass} ${className}`}
            style={style}
            {...props}
        >
            {children}
        </Badge>
    );
};

export default StyledBadge;
