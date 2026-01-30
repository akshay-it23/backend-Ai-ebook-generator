import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon = null,
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0F] disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/50 hover:scale-105 focus:ring-primary',
        secondary: 'bg-gradient-to-r from-secondary to-secondary-dark text-white hover:shadow-lg hover:shadow-secondary/50 hover:scale-105 focus:ring-secondary',
        outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 focus:ring-primary',
        ghost: 'bg-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary focus:ring-white/20',
        danger: 'bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg hover:shadow-error/50 hover:scale-105 focus:ring-error',
        success: 'bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg hover:shadow-success/50 hover:scale-105 focus:ring-success',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-3 text-base rounded-xl',
        lg: 'px-8 py-4 text-lg rounded-xl',
    };

    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {icon && <span>{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
