import React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
        ref={ref}
        className={classNames(
            "position-relative z-3 d-flex flex-1 align-items-center justify-content-center",
            className
        )}
        {...props}
    >
        {children}
        <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
        ref={ref}
        className={classNames(
            "d-flex list-unstyled m-0 p-0 align-items-center justify-content-center gap-1",
            className
        )}
        {...props}
    />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
        ref={ref}
        className={classNames(
            "btn btn-sm btn-link text-decoration-none text-dark fw-medium d-inline-flex align-items-center justify-content-center px-3 py-2 rounded-2 transition-colors hover-bg-light focus-bg-light",
            className
        )}
        {...props}
    >
        {children}
        <i className="bi bi-chevron-down ms-1 fs-6 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" style={{ fontSize: '0.75rem' }}></i>
    </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
        ref={ref}
        className={classNames(
            "position-absolute start-0 top-0 w-100 md:w-auto bg-white border rounded shadow-lg overflow-hidden p-3",
            className
        )}
        style={{
            width: 'var(--radix-navigation-menu-viewport-width)',
            // Simple animation placeholder - proper animations usually require keyframes in CSS
            animationDuration: '0.2s',
        }}
        {...props}
    />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
    <div className={classNames("position-absolute start-0 top-100 w-100 d-flex justify-content-center", className)} style={{ perspective: '2000px' }}>
        <NavigationMenuPrimitive.Viewport
            className={classNames(
                "position-relative mt-2 bg-white border rounded shadow-sm overflow-hidden text-dark",
                className
            )}
            style={{
                width: 'var(--radix-navigation-menu-viewport-width)',
                height: 'var(--radix-navigation-menu-viewport-height)',
                transition: 'width 300ms ease, height 300ms ease'
            }}
            ref={ref}
            {...props}
        />
    </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
        ref={ref}
        className={classNames(
            "position-absolute top-100 start-0 z-1 d-flex justify-content-center overflow-hidden h-2",
            className
        )}
        style={{ transition: 'transform 250ms ease' }}
        {...props}
    >
        <div className="position-relative top-50 bg-white border shadow-sm w-3 h-3 rotate-45 rounded-1" />
    </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
};
