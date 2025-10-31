import React, { useState, useEffect } from 'react';
import { Play, ChevronRight, ChevronDown } from '../components/Icons';
import type { WorkoutDay, HistoryEntry, WorkoutProgram, FunMetrics } from '../types';

interface HomePageProps {
  onStartWorkout: () => void;
  nextWorkout: WorkoutDay;
  week: number;
  history: HistoryEntry[];
  program: WorkoutProgram;
  onStartSpecificWorkout: (weekNum: number, dayIndex: number) => void;
  funMetrics: FunMetrics;
}

const HomePage: React.FC<HomePageProps> = ({ onStartWorkout, nextWorkout, week, history, program, onStartSpecificWorkout, funMetrics }) => {
  const { totalKg, totalReps, totalSets } = funMetrics;
  
  const [showPicker, setShowPicker] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(week);

  useEffect(() => {
    setSelectedWeek(week);
  }, [week]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', { 
      notation: 'compact', 
      maximumFractionDigits: 1 
    }).format(num);
  };
  
  const totalWorkouts = history.length;

  return (
    <div className="p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Hi Alfie!</h1>
        <p className="text-lg text-gray-400">Ready to crush your next session?</p>
      </header>

      <div className="bg-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-blue-400">NEXT WORKOUT</p>
            <h2 className="text-2xl font-bold text-white">Week {week}, {nextWorkout.splitName}</h2>
          </div>
          <button
            onClick={onStartWorkout}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-transform active:scale-95"
          >
            <Play fill="white" size={24} />
          </button>
        </div>
        <div className="space-y-2">
          {nextWorkout.exercises.slice(0, 3).map((ex) => (
            <p key={ex.name} className="text-gray-400">
              - {ex.name} ({ex.targetReps})
            </p>
          ))}
          {nextWorkout.exercises.length > 3 && (
             <p className="text-gray-500">+ {nextWorkout.exercises.length - 3} more...</p>
          )}
        </div>
      </div>

      <div className="bg-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-full flex justify-between items-center"
        >
          <h2 className="text-xl font-bold text-white">Or, select a workout</h2>
          {showPicker ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>

        {showPicker && (
          <div className="space-y-4 pt-2">
            <div>
              <label htmlFor="week-select" className="block text-sm font-medium text-gray-400 mb-1">Select Week</label>
              <select
                id="week-select"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                className="w-full bg-slate-700 text-white p-2 rounded-lg"
              >
                {program.map(w => (
                  <option key={w.week} value={w.week}>Week {w.week}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              {program.find(w => w.week === selectedWeek)?.days.map((day, index) => (
                <button
                  key={day.day}
                  onClick={() => onStartSpecificWorkout(selectedWeek, index)}
                  className="w-full text-left bg-slate-700 hover:bg-slate-600 p-3 rounded-lg flex justify-between items-center transition-colors"
                >
                  <span className="font-semibold">{day.day}: {day.splitName}</span>
                  <Play size={18} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl shadow-lg text-center">
          <p className="text-sm text-gray-400">Total Sessions</p>
          <p className="text-3xl font-bold text-white">{formatNumber(totalWorkouts)}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl shadow-lg text-center">
          <p className="text-sm text-gray-400">Total Volume (kg)</p>
          <p className="text-3xl font-bold text-white">{formatNumber(totalKg)}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl shadow-lg text-center">
          <p className="text-sm text-gray-400">Total Reps</p>
          <p className="text-3xl font-bold text-white">{formatNumber(totalReps)}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl shadow-lg text-center">
          <p className="text-sm text-gray-400">Total Sets</p>
          <p className="text-3xl font-bold text-white">{formatNumber(totalSets)}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
