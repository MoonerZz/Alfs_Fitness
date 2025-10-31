import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  fill?: string;
}

const createIcon = (path: React.ReactNode) => {
  const IconComponent: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, fill='none' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {path}
    </svg>
  );
  IconComponent.displayName = `Icon`;
  return IconComponent;
};

export const Home = createIcon(<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />);
export const Dumbbell = createIcon(<>
  <rect x="3" y="8" width="4" height="8" rx="1" />
  <rect x="17" y="8" width="4" height="8" rx="1" />
  <line x1="7" y1="12" x2="17" y2="12" />
</>);
export const History = createIcon(<>
  <circle cx="12" cy="12" r="10" />
  <polyline points="12 6 12 12 16 14" />
</>);
export const Play = createIcon(<polygon points="6 3 20 12 6 21 6 3" />);
export const Plus = createIcon(<path d="M5 12h14" /><path d="M12 5v14" />);
export const Timer = createIcon(<>
  <line x1="10" x2="14" y1="2" y2="2" />
  <line x1="12" x2="12" y1="14" y2="18" />
  <path d="M19 14a7 7 0 1 1-10.4-6.1" />
</>);
export const X = createIcon(<path d="M18 6 6 18" /><path d="m6 6 12 12" />);
export const ChevronRight = createIcon(<path d="m9 18 6-6-6-6" />);
export const ChevronDown = createIcon(<path d="m6 9 6 6 6-6" />);
export const Check = createIcon(<path d="M20 6 9 17l-5-5" />);
export const TapeMeasure = createIcon(<>
    <path d="M15 5H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3"/>
    <path d="M20 5v10"/>
    <path d="M15 5V3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2"/>
    <path d="M8 12h.01"/>
    <path d="M12 12h.01"/>
    <path d="M16 12h.01"/>
</>);
export const Trash2 = createIcon(<path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />);
export const Target = createIcon(<>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
</>);
