import React from 'react';

const InputField = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    icon = null,
    className = '',
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-2">
                    {label} {required && <span className="text-error">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        {icon}
                    </div>
                )}

                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`
            w-full px-4 py-3 rounded-xl glass text-text-primary placeholder-text-muted
            border transition-all duration-200 outline-none
            ${icon ? 'pl-12' : ''}
            ${error
                            ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                            : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                        }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                    {...props}
                />
            </div>

            {error && (
                <p className="mt-2 text-sm text-error animate-fadeIn">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;
