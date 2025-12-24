import React, { useContext } from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import classNames from 'classnames';

const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={classNames(
            "d-flex align-items-center gap-2",
            // has-[:disabled] not easily replicable with simple bootstrap classes, usually parent styles
            containerClassName
        )}
        className={classNames("form-control", className)} // form-control might interfere, so usually we style slots individually
        {...props}
    />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={classNames("d-flex align-items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
        <div
            ref={ref}
            className={classNames(
                "position-relative d-flex align-items-center justify-content-center border-top border-bottom border-start border-secondary-subtle bg-white text-dark small transition-all",
                // First/Last rounded logic handled by Bootstrap button-group style logic usually, or manual:
                "first-rounded-start last-rounded-end border-end",
                isActive && "z-1 border-primary ring-2 ring-primary-subtle",
                className
            )}
            style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRightWidth: '1px',
                ...props.style
            }}
            {...props}
        >
            <style>
                {`
                .first-rounded-start:first-child { border-top-left-radius: 0.375rem; border-bottom-left-radius: 0.375rem; }
                .last-rounded-end:last-child { border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem; }
            `}
            </style>
            {char}
            {hasFakeCaret && (
                <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center pe-none">
                    <div className="bg-dark" style={{ width: '1px', height: '1rem', animation: 'caret-blink 1s infinite' }} />
                    <style>{`@keyframes caret-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
                </div>
            )}
        </div>
    );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props} className="mx-1">
        <i className="bi bi-dot fs-4"></i>
    </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
