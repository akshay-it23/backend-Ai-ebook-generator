import React from 'react';

const Card = ({
    children,
    className = '',
    hover = false,
    onClick,
    ...props
}) => {
    const baseClasses = 'glass rounded-2xl p-6 shadow-xl';
    const hoverClasses = hover
        ? 'transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 cursor-pointer'
        : '';

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
