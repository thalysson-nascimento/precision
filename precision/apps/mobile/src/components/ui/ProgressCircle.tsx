import React from 'react';

interface ProgressCircleProps {
  workedTime: string;
  expectedWorkMinutes: number;
  label: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  workedTime,
  expectedWorkMinutes,
  label,
}) => {
  // Parse worked time HH:MM to minutes
  const [hours, minutes] = workedTime.split(':').map(Number);
  const workedMinutes = (hours || 0) * 60 + (minutes || 0);

  // SVG parameters
  const size = 250;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2 - 10; // 85
  const circumference = 2 * Math.PI * radius; // ~534.07
  
  const isCompleted = workedMinutes >= expectedWorkMinutes;
  
  // Calculate progress ratio
  const progressRatio = Math.min(1, workedMinutes / expectedWorkMinutes);
  const mainDashoffset = circumference - progressRatio * circumference;

  // Calculate overtime ratio (orange stroke)
  const overtimeMinutes = Math.max(0, workedMinutes - expectedWorkMinutes);
  const overtimeRatio = Math.min(1, overtimeMinutes / expectedWorkMinutes);
  const overtimeDashoffset = circumference - overtimeRatio * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          {/* Soft blue-to-green gradient for main progress */}
          <linearGradient id="blueToGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Background Circle Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#D9D9D9"
          strokeWidth={strokeWidth - 1}
        />

        {/* Main Progress Circle (Solid green #7A9771) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#7A9771"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={mainDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />

        {/* Overtime Progress Circle (Soft orange) */}
        {overtimeMinutes > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#fb923c"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={overtimeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}
      </svg>

      {/* Internal Text Labels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 select-none">
        <span className="text-[48px] font-normal text-white tracking-tighter leading-none">
          {workedTime}
        </span>
        <span className="text-[11px] font-normal text-white/70 max-w-[130px] leading-tight mt-xs">
          {label}
        </span>
      </div>
    </div>
  );
};
