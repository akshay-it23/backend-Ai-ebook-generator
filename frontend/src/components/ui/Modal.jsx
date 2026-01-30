import React, { useEffect } from 'react';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnOutsideClick = true,
    className = '',
}) => {
    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
    };

    const sizeClass = sizes[size] || sizes.md;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeOnOutsideClick ? onClose : undefined}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className={`relative w-full ${sizeClass} glass-strong rounded-2xl shadow-2xl animate-scaleIn ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        {title && (
                            <h2 className="text-2xl font-bold text-text-primary">
                                {title}
                            </h2>
                        )}

                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-text-secondary hover:text-text-primary"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
