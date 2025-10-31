
import React from 'react';
import { Home, Dumbbell, TrendingUp, History } from './Icons';
import type { Page } from '../types';

interface BottomNavProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setPage }) => {
  const navItems = [
    { name: 'home' as Page, icon: Home, label: 'Home' },
    { name: 'workouts' as Page, icon: Dumbbell, label: 'Workouts' },
    { name: 'progress' as Page, icon: TrendingUp, label: 'Progress' },
    { name: 'history' as Page, icon: History, label: 'History' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 shadow-lg">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.name;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setPage(item.name)}
              className={`flex flex-col items-center justify-center w-full pt-3 pb-2 transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="w-8 h-1 bg-blue-400 rounded-full mt-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
