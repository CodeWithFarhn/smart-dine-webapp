import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import classNames from 'classnames';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={classNames(
            "z-3 bg-white border rounded shadow p-3 text-dark text-start text-wrap",
            className
        )}
        style={{
            maxWidth: '300px',
            animationDuration: '0.2s',
            // Optional: Add simple fade-in/out logic if desire, but Radix handles mounting
            // For simple bootstrap compat, we rely on standard box model styling
        }}
        {...props}
    />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
