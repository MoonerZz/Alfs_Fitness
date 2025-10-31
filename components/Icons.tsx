
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
  <path d="M14.4 14.4 9.6 9.6" />
  <path d="M18.657 5.343a2 2 0 1 1 2.828 2.828l-1.414 1.414-2.829-2.828 1.415-1.415z" />
  <path d="m11.3 21.3-8.6-8.6" />
  <path d="M5.343 18.657a2 2 0 1 1-2.828-2.828l1.414-1.414 2.829 2.828-1.415 1.415z" />
</>);
export const History = createIcon(<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" />);
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
export const TrendingUp = createIcon(<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />);
export const Trash2 = createIcon(<path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />);
export const Target = createIcon(<>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
</>);
