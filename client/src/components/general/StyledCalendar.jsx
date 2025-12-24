import React from 'react';
import { DayPicker } from 'react-day-picker';
import classNames from 'classnames';
import 'react-day-picker/dist/style.css'; // Import default styles as a base

const StyledCalendar = ({
    className,
    classNames: customClassNames,
    showOutsideDays = true,
    ...props
}) => {
    return (
        <div className={classNames("p-3 border rounded-3 bg-white shadow-sm d-inline-block", className)}>
            <style>
                {`
                .rdp { --rdp-cell-size: 40px; --rdp-accent-color: var(--bs-primary); --rdp-background-color: var(--bs-primary-bg-subtle); margin: 0; }
                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: var(--bs-gray-100); }
                .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: var(--bs-primary); color: white; }
                .rdp-day_today { font-weight: bold; color: var(--bs-primary); }
            `}
            </style>
            <DayPicker
                showOutsideDays={showOutsideDays}
                className={classNames("m-0")}
                classNames={{
                    months: "d-flex flex-column flex-sm-row gap-4",
                    month: "d-flex flex-column gap-3",
                    caption: "d-flex justify-content-center align-items-center position-relative py-2",
                    caption_label: "small fw-bold mb-0",
                    nav: "d-flex align-items-center gap-1 position-absolute w-100 justify-content-between px-1",
                    nav_button: "btn btn-outline-secondary btn-sm p-0 d-flex align-items-center justify-content-center border-0 opacity-50 hover-opacity-100",
                    nav_button_previous: "position-absolute start-0",
                    nav_button_next: "position-absolute end-0",
                    table: "w-100 border-collapse",
                    head_row: "d-flex",
                    head_cell: "text-muted small fw-normal rounded-1 flex-grow-1 text-center py-1",
                    row: "d-flex w-100 mt-2",
                    cell: "text-center p-0 position-relative",
                    day: "btn btn-link text-decoration-none text-dark p-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-2",
                    day_selected: "bg-primary text-white hover-bg-primary hover-text-white focus-bg-primary focus-text-white",
                    day_today: "bg-light text-primary fw-bold",
                    day_outside: "text-secondary opacity-50",
                    day_disabled: "text-secondary opacity-25",
                    day_hidden: "invisible",
                    ...customClassNames,
                }}
                components={{
                    IconLeft: ({ ...props }) => <i className="bi bi-chevron-left" {...props}></i>,
                    IconRight: ({ ...props }) => <i className="bi bi-chevron-right" {...props}></i>,
                }}
                {...props}
            />
        </div>
    );
};

export default StyledCalendar;
