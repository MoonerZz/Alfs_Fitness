import React, { useMemo } from 'react';
import { Plus } from './Icons';
import { calculate1RM } from '../utils/workout';
import type { Exercise, Set } from '../types';

interface ExerciseTrackerProps {
  exercise: Exercise;
  sets: Set[];
  onAddSet: () => void;
  onUpdateSet: (setIndex: number, field: keyof Set, value: string) => void;
}

const ExerciseTracker: React.FC<ExerciseTrackerProps> = ({ exercise, sets, onAddSet, onUpdateSet }) => {
  const targetSets = exercise.targetSets;
  const completedSets = sets.length;

  const session1RM = useMemo(() => {
    if (!sets || sets.length === 0) return 0;
    return sets.reduce((max, set) => {
      const current1RM = calculate1RM(set.weight, set.reps);
      return current1RM > max ? current1RM : max;
    }, 0);
  }, [sets]);

  return (
    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white">{exercise.name}</h3>
          <p className="text-sm text-gray-400">Target: {exercise.targetSets} sets of {exercise.targetReps}</p>
        </div>
        {session1RM > 0 && (
          <div className="bg-blue-900 text-blue-300 p-2 rounded-lg text-center">
            <p className="text-xs font-bold">SESSION 1RM</p>
            <p className="text-lg font-bold">{session1RM} kg</p>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {sets.map((set, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="bg-slate-900 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
              {index + 1}
            </span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="kg"
                value={set.weight === 0 ? '' : set.weight}
                onChange={(e) => onUpdateSet(index, 'weight', e.target.value)}
                className="w-full bg-slate-700 text-white p-2 rounded-lg text-center"
              />
            </div>
            <span className="text-gray-400">x</span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="reps"
                value={set.reps === 0 ? '' : set.reps}
                onChange={(e) => onUpdateSet(index, 'reps', e.target.value)}
                className="w-full bg-slate-700 text-white p-2 rounded-lg text-center"
              />
            </div>
          </div>
        ))}
      </div>
      
      {completedSets < targetSets * 2 && ( // Allow extra sets
        <button
          onClick={onAddSet}
          className="w-full bg-slate-700 hover:bg-slate-600 text-blue-400 font-semibold py-3 rounded-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Set ({completedSets + 1})
        </button>
      )}
    </div>
  );
};

export default ExerciseTracker;
