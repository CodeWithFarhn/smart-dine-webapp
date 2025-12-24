import React, { useState, useEffect, useCallback, useContext } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

const CarouselContext = React.createContext(null);

function useCarousel() {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }
    return context;
}

const Carousel = React.forwardRef(
    (
        {
            orientation = "horizontal",
            opts,
            setApi,
            plugins,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === "horizontal" ? "x" : "y",
            },
            plugins
        );
        const [canScrollPrev, setCanScrollPrev] = useState(false);
        const [canScrollNext, setCanScrollNext] = useState(false);

        const onSelect = useCallback((api) => {
            if (!api) return;
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }, []);

        const scrollPrev = useCallback(() => {
            api?.scrollPrev();
        }, [api]);

        const scrollNext = useCallback(() => {
            api?.scrollNext();
        }, [api]);

        const handleKeyDown = useCallback(
            (event) => {
                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    scrollPrev();
                } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    scrollNext();
                }
            },
            [scrollPrev, scrollNext]
        );

        useEffect(() => {
            if (!api || !setApi) return;
            setApi(api);
        }, [api, setApi]);

        useEffect(() => {
            if (!api) return;
            onSelect(api);
            api.on("reInit", onSelect);
            api.on("select", onSelect);

            return () => {
                api?.off("select", onSelect);
            };
        }, [api, onSelect]);

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api: api,
                    opts,
                    orientation:
                        orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                }}
            >
                <div
                    ref={ref}
                    onKeyDownCapture={handleKeyDown}
                    className={classNames("position-relative", className)}
                    role="region"
                    aria-roledescription="carousel"
                    {...props}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        );
    }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div
                ref={ref}
                className={classNames(
                    "d-flex",
                    orientation === "horizontal" ? "ms-n3" : "flex-column mt-n3", // Using Bootstrap negative margin utilities if available or custom
                    className
                )}
                style={{
                    // Fallback for negative margins if bootstrap utilities aren't enough
                    marginLeft: orientation === "horizontal" ? '-1rem' : undefined,
                    marginTop: orientation === "vertical" ? '-1rem' : undefined,
                }}
                {...props}
            />
        </div>
    );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={classNames(
                "flex-shrink-0 flex-grow-0",
                // min-w-0 is default in flex usually but explicit helps. 
                // basis-full -> flex: 0 0 100%
                orientation === "horizontal" ? "ps-3" : "pt-3",
                className
            )}
            style={{
                minWidth: 0,
                flexBasis: '100%',
                paddingLeft: orientation === "horizontal" ? '1rem' : undefined,
                paddingTop: orientation === "vertical" ? '1rem' : undefined
            }}
            {...props}
        />
    );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(({ className, variant = "outline-secondary", size, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
        <Button
            ref={ref}
            variant={variant}
            // size={size} // Bootstap size prop is strictly 'sm' | 'lg'. If size is icon, we handle via classes
            className={classNames(
                "position-absolute p-0 rounded-circle d-flex align-items-center justify-content-center border bg-white shadow-sm",
                orientation === "horizontal"
                    ? "top-50 translate-middle-y"
                    : "start-50 translate-middle-x rotate-90",
                className
            )}
            style={{
                width: '2.5rem',
                height: '2.5rem',
                left: orientation === 'horizontal' ? '-1.25rem' : undefined,
                top: orientation === 'vertical' ? '-1.25rem' : undefined,
                zIndex: 10
            }}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <i className="bi bi-arrow-left"></i>
            <span className="visually-hidden">Previous slide</span>
        </Button>
    );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef(({ className, variant = "outline-secondary", size, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
        <Button
            ref={ref}
            variant={variant}
            className={classNames(
                "position-absolute p-0 rounded-circle d-flex align-items-center justify-content-center border bg-white shadow-sm",
                orientation === "horizontal"
                    ? "top-50 translate-middle-y"
                    : "bottom-0 start-50 translate-middle-x rotate-90", // bottom adjust needed
                className
            )}
            style={{
                width: '2.5rem',
                height: '2.5rem',
                right: orientation === 'horizontal' ? '-1.25rem' : undefined,
                bottom: orientation === 'vertical' ? '-1.25rem' : undefined,
                zIndex: 10
            }}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <i className="bi bi-arrow-right"></i>
            <span className="visually-hidden">Next slide</span>
        </Button>
    );
});
CarouselNext.displayName = "CarouselNext";

export {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
};
