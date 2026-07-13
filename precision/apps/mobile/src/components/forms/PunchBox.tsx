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
      onClick={!isConfirmed ? onEdit : undefined}
      className={`flex flex-col justify-between transition-all duration-300 min-h-[56px] px-2 ${
        isDisabled ? 'opacity-30' : 'opacity-100'
      } ${!isConfirmed ? 'cursor-pointer hover:bg-white/5 rounded-md p-1' : ''}`}
    >
      {/* Box Header: Label + Confirmed check / Edit button */}
      <div className="flex justify-between items-center gap-1">
        <span className="text-[12px] font-normal uppercase text-white/90 truncate">
          {label}
        </span>
        {isConfirmed ? (
          <span
            className="material-symbols-outlined text-white punch-box__check-icon flex-shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        ) : (
          showEditButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="text-white text-[10px] font-bold hover:underline cursor-pointer flex-shrink-0"
            >
              ✎
            </button>
          )
        )}
      </div>
      
      {/* Box Value: Icon + Time */}
      <div className="flex items-center gap-1 mt-auto pt-1">
        <span
          className="material-symbols-outlined punch-box__time-icon flex-shrink-0 text-white"
          style={isConfirmed ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {iconName}
        </span>
        <span className="text-[16px] font-normal text-white">
          {time}
        </span>
      </div>
    </div>
  );
};
export default PunchBox;
