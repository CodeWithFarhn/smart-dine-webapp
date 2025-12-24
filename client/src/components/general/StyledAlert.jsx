import React from 'react';
import { Alert as BsAlert } from 'react-bootstrap';

const StyledAlert = ({
    variant = "default", // default | destructive
    title,
    children,
    icon,
    onClose,
    dismissible,
    className = ""
}) => {
    // Map abstract variants to Bootstrap variants and styling
    const getVariantStyles = () => {
        switch (variant) {
            case 'destructive':
                return {
                    variant: 'danger',
                    iconClass: 'text-danger'
                };
            case 'success':
                return {
                    variant: 'success',
                    iconClass: 'text-success'
                };
            default:
                return {
                    variant: 'light', // or 'secondary' or a custom class
                    iconClass: 'text-dark'
                };
        }
    };

    const { variant: bsVariant, iconClass } = getVariantStyles();

    // Custom styles to match the "shadcn" look: rounded-lg border p-4
    // We use Bootstrap's Alert but tweak it.

    return (
        <BsAlert
            variant={bsVariant}
            onClose={onClose}
            dismissible={dismissible}
            className={`d-flex align-items-start gap-3 border shadow-sm rounded-3 ${className}`}
            style={{
                backgroundColor: variant === 'default' ? '#fff' : undefined,
                borderColor: variant === 'default' ? '#e5e7eb' : undefined // gray-200
            }}
        >
            {icon && (
                <div className={`mt-1 ${iconClass}`}>
                    {icon}
                </div>
            )}
            <div className="w-100">
                {title && <BsAlert.Heading className="fs-6 fw-bold mb-1">{title}</BsAlert.Heading>}
                <div className="text-secondary small" style={{ lineHeight: '1.5' }}>
                    {children}
                </div>
            </div>
        </BsAlert>
    );
};

export const AlertTitle = ({ children, className = "" }) => (
    <h5 className={`fw-medium mb-1 ${className}`}>{children}</h5>
);

export const AlertDescription = ({ children, className = "" }) => (
    <div className={`text-sm opacity-90 ${className}`}>{children}</div>
);

export default StyledAlert;
