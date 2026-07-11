import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  placeholder: string;
  icon: string;
  onChange: (val: string) => void;
  required?: boolean;
  suffixIcon?: string;
  onSuffixClick?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  placeholder,
  icon,
  onChange,
  required = false,
  suffixIcon,
  onSuffixClick,
}) => {
  return (
    <div className="login-card__field space-y-xs">
      <label 
        htmlFor={id} 
        className="login-card__label font-label-caps text-label-caps text-on-surface-variant block ml-1"
      >
        {label}
      </label>
      <div className="login-card__input-wrapper relative">
        <span className="login-card__icon material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`login-card__input input-soft w-full h-14 pl-12 ${suffixIcon ? 'pr-12' : 'pr-4'} rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline/50`}
          required={required}
        />
        {suffixIcon && (
          <button
            type="button"
            onClick={onSuffixClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center border-none bg-transparent outline-none"
          >
            <span className="material-symbols-outlined text-[20px]">
              {suffixIcon}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
