import React, { useState } from 'react';

// Root Component
const Avatar = ({ children, className = "", style = {} }) => {
    return (
        <div
            className={`position-relative d-flex align-items-center justify-content-center overflow-hidden rounded-circle ${className}`}
            style={{
                width: '40px',
                height: '40px',
                flexShrink: 0,
                backgroundColor: '#f8f9fa', // bg-light fallback
                ...style
            }}
        >
            {children}
        </div>
    );
};

// Image Component
const AvatarImage = ({ src, alt, className = "" }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) return null;

    return (
        <img
            src={src}
            alt={alt}
            className={`w-100 h-100 ${className}`}
            style={{ objectFit: 'cover' }}
            onError={() => setHasError(true)}
        />
    );
};

// Fallback Component
const AvatarFallback = ({ children, className = "", style = {} }) => {
    // This renders only if the image sibling renders null (handled by parent logic? 
    // Actually, traditionally in Radix, the Image component hides itself on error, revealing the fallback behind it 
    // OR the fallback is rendered conditionally.

    // Simpler approach for our "mimic": 
    // We stack them. If image loads, it covers fallback. If image fails (returns null above), fallback is visible.
    // However, since we return null in AvatarImage on error, that component effectively disappears.
    // So we just need to place AvatarFallback *after* AvatarImage in usage, 
    // or rely on CSS stacking context?
    //
    // Better Approach for this Adapter:
    // The AvatarImage is responsible for 'being there'. 
    // If we want to truly replicate the "fallback" behavior where you write:
    // <Avatar><AvatarImage /><AvatarFallback /></Avatar>
    // We need to know if the image failed.
    //
    // BUT, a pure CSS solution (Layout) works best:
    // Put Fallback BEHIND Image. Image has width 100% height 100%. 
    // If Image loads, it covers Fallback.
    // If Image fails, we hide it, showing Fallback.

    return (
        <div
            className={`d-flex align-items-center justify-content-center w-100 h-100 bg-secondary-subtle text-secondary fw-bold small ${className}`}
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                ...style
            }}
        >
            {children}
        </div>
    );
};

// Adjusting AvatarImage to sit on TOP
const AvatarImageAdjusted = ({ src, alt, className = "" }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) return null;

    return (
        <img
            src={src}
            alt={alt}
            className={`w-100 h-100 ${className}`}
            style={{
                objectFit: 'cover',
                position: 'relative',
                zIndex: 1
            }}
            onError={() => setHasError(true)}
        />
    );
};

export { Avatar, AvatarImageAdjusted as AvatarImage, AvatarFallback };
