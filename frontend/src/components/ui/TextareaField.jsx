import React, { useEffect, useRef } from 'react';

const TextareaField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    rows = 4,
    maxLength,
    autoResize = false,
    className = '',
    ...props
}) => {
    const textareaRef = useRef(null);

    // Auto-resize functionality
    useEffect(() => {
        if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value, autoResize]);

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-2">
                    {label} {required && <span className="text-error">*</span>}
                </label>
            )}

            <textarea
                ref={textareaRef}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                rows={rows}
                maxLength={maxLength}
                className={`
          w-full px-4 py-3 rounded-xl glass text-text-primary placeholder-text-muted
          border transition-all duration-200 outline-none resize-none
          ${error
                        ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                        : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
                {...props}
            />

            <div className="flex justify-between items-center mt-2">
                {error ? (
                    <p className="text-sm text-error animate-fadeIn">
                        {error}
                    </p>
                ) : (
                    <div></div>
                )}

                {maxLength && (
                    <p className="text-sm text-text-muted">
                        {value?.length || 0} / {maxLength}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TextareaField;
