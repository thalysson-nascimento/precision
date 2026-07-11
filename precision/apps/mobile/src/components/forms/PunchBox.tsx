import React from 'react';

interface PunchBoxProps {
  label: string;
  time: string;
  iconName: string;
  isConfirmed: boolean;
  isDisabled: boolean;
  onEdit: () => void;
  showEditButton: boolean;
}

export const PunchBox: React.FC<PunchBoxProps> = ({
  label,
  time,
  iconName,
  isConfirmed,
  isDisabled,
  onEdit,
  showEditButton,
}) => {
  return (
    <div
      className={`p-2 rounded-xl border flex flex-col justify-between transition-all duration-300 min-h-[72px] ${
        isDisabled
          ? 'bg-surface-container-lowest border-dashed border-outline-variant opacity-60'
          : 'bg-surface-container-low border-secondary-container'
      }`}
    >
      {/* Box Header: Label + Confirmed check / Edit button */}
      <div className="flex justify-between items-start gap-1">
        <span className="text-[9px] font-bold tracking-wider uppercase text-on-surface-variant truncate">
          {label}
        </span>
        {isConfirmed ? (
          <span
            className="material-symbols-outlined text-secondary punch-box__check-icon flex-shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        ) : (
          showEditButton && (
            <button
              onClick={onEdit}
              className="text-primary text-[9px] font-bold hover:underline cursor-pointer flex-shrink-0"
            >
              ✎
            </button>
          )
        )}
      </div>
      
      {/* Box Value: Icon + Time */}
      <div className="flex items-center gap-1 mt-auto pt-1">
        <span
          className={`material-symbols-outlined punch-box__time-icon flex-shrink-0 ${
            isConfirmed ? 'text-secondary' : 'text-outline'
          }`}
          style={isConfirmed ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {iconName}
        </span>
        <span className="text-[13px] font-bold text-on-surface">
          {isDisabled ? '--:--' : time}
        </span>
      </div>
    </div>
  );
};
export default PunchBox;
