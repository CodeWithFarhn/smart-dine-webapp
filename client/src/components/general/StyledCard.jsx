import React from 'react';
import classNames from 'classnames';

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={classNames(
            "card border bg-white shadow-sm rounded-4", // rounded-4 is approx xl
            className
        )}
        {...props}
    >
        {children}
    </div>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={classNames("d-flex flex-column gap-1 p-4", className)}
        {...props}
    >
        {children}
    </div>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
    <h3
        ref={ref}
        className={classNames(
            "h5 fw-semibold mb-0 tracking-tight text-dark",
            className
        )}
        {...props}
    >
        {children}
    </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
    <p
        ref={ref}
        className={classNames("small text-muted mb-0", className)}
        {...props}
    >
        {children}
    </p>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div ref={ref} className={classNames("p-4 pt-0", className)} {...props}>
        {children}
    </div>
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={classNames("d-flex align-items-center p-4 pt-0", className)}
        {...props}
    >
        {children}
    </div>
));
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
