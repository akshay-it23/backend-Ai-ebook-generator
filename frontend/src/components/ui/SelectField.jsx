import React from 'react';

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = 'Select an option',
    error,
    required = false,
    disabled = false,
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

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`
          w-full px-4 py-3 rounded-xl glass text-text-primary
          border transition-all duration-200 outline-none cursor-pointer
          ${error
                        ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                        : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
                {...props}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-bg-secondary text-text-primary"
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="mt-2 text-sm text-error animate-fadeIn">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SelectField;
