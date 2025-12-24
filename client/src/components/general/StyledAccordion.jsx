import { Accordion } from 'react-bootstrap';
import { useContext } from 'react';
import { AccordionContext } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const CustomToggle = ({ children, eventKey, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    // Check if THIS specific toggle is active
    // activeEventKey can be a string or array (if alwaysOpen)
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <div
            className="d-flex align-items-center justify-content-between py-3 cursor-pointer w-100"
            onClick={decoratedOnClick}
            style={{ cursor: 'pointer', userSelect: 'none' }}
        >
            <span className="fw-medium text-dark flex-grow-1">{children}</span>
            <i
                className="bi bi-chevron-down text-muted transition-transform"
                style={{
                    transform: isCurrentEventKey ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                }}
            ></i>
        </div>
    );
};

const StyledAccordion = ({ items, defaultActiveKey = "0" }) => {
    return (
        <Accordion defaultActiveKey={defaultActiveKey} flush>
            {items.map((item, index) => (
                <div key={index} className="border-bottom">
                    <CardHeader>
                        <CustomToggle eventKey={index.toString()}>
                            {item.title}
                        </CustomToggle>
                    </CardHeader>
                    <Accordion.Collapse eventKey={index.toString()}>
                        <div className="pb-4 pt-0 text-secondary small">
                            {item.content}
                        </div>
                    </Accordion.Collapse>
                </div>
            ))}
        </Accordion>
    );
};

// Simplified Wrapper to match the usage pattern of passing children structure if needed, 
// but sticking to a loop is cleaner for 'items' prop usage.
// Let's also export the sub-components to allow flexible composition if the user prefers that.

export const AccordionItem = ({ children, className = "" }) => (
    <div className={`border-bottom ${className}`}>
        {children}
    </div>
);

export const AccordionTrigger = ({ children, eventKey }) => (
    <CustomToggle eventKey={eventKey}>
        {children}
    </CustomToggle>
);

export const AccordionContent = ({ children, eventKey }) => (
    <Accordion.Collapse eventKey={eventKey}>
        <div className="pb-4 pt-0 text-secondary">
            {children}
        </div>
    </Accordion.Collapse>
);

// We need a wrapper to provide the Context for CustomToggle if we use the individual components
export const AccordionRoot = ({ children, defaultActiveKey }) => (
    <Accordion defaultActiveKey={defaultActiveKey} flush>
        {children}
    </Accordion>
);

// Helper for the internal implementation details
const CardHeader = ({ children }) => <div className="bg-transparent border-0 p-0">{children}</div>;

export default StyledAccordion;
