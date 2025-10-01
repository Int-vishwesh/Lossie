
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    
    const inputId = React.useId(); 

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          {label}
        </label>
        <input
          id={inputId}
          type={type}
          className={`
            w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm 
            focus:ring-brand-primary focus:border-brand-primary 
            transition duration-150 ease-in-out
            ${className} 
          `}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };