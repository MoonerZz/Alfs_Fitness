
import React from 'react';

interface SparklineDataPoint {
  date: string;
  value: number;
}

interface SparklineGraphProps {
  data: SparklineDataPoint[];
}

const SparklineGraph: React.FC<SparklineGraphProps> = ({ data }) => {
  if (data.length < 2) {
    return <div className="h-16 flex items-center justify-center text-sm text-gray-500">Not enough data to graph yet.</div>;
  }
  
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  
  const normalized = values.map(v => range === 0 ? 50 : 100 - ((v - min) / range) * 90 + 5); // 5% padding
  
  const path = normalized.map((val, i) => {
    const x = (i / (normalized.length - 1)) * 100;
    const y = val;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-full h-16" preserveAspectRatio="none">
      <path d={path} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default SparklineGraph;
