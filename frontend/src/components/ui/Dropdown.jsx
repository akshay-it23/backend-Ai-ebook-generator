import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({
    trigger,
    children,
    align = 'right',
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const alignmentClasses = {
        left: 'left-0',
        right: 'right-0',
        center: 'left-1/2 -translate-x-1/2',
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={`
            absolute top-full mt-2 min-w-[200px] z-50
            glass-strong rounded-xl shadow-2xl border border-border
            animate-fadeInDown
            ${alignmentClasses[align]}
            ${className}
          `}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export const DropdownItem = ({ children, onClick, icon, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`
        w-full px-4 py-3 text-left flex items-center gap-3
        text-text-secondary hover:text-text-primary hover:bg-white/5
        transition-colors first:rounded-t-xl last:rounded-b-xl
        ${className}
      `}
        >
            {icon && <span className="text-lg">{icon}</span>}
            <span>{children}</span>
        </button>
    );
};

export const DropdownDivider = () => {
    return <div className="h-px bg-border my-1" />;
};

export default Dropdown;
