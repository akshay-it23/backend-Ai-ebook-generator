import React from 'react';

const Loader = ({ size = 'md', variant = 'spinner', text = '' }) => {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    const sizeClass = sizes[size] || sizes.md;

    if (variant === 'spinner') {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <svg
                    className={`animate-spin ${sizeClass}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                {text && <p className="text-text-secondary">{text}</p>}
            </div>
        );
    }

    if (variant === 'dots') {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse animation-delay-200" />
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse animation-delay-400" />
                </div>
                {text && <p className="text-text-secondary">{text}</p>}
            </div>
        );
    }

    if (variant === 'gradient') {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <div className={`${sizeClass} rounded-full gradient-primary animate-spin`}>
                    <div className="w-full h-full rounded-full bg-bg-primary m-2" />
                </div>
                {text && <p className="text-text-secondary">{text}</p>}
            </div>
        );
    }

    return null;
};

export default Loader;
