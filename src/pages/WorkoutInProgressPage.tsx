import React from 'react';
import ExerciseTracker from '../components/ExerciseTracker';
import { Check } from '../components/Icons';
import type { ActiveWorkout, WorkoutLog, Set } from '../types';

interface WorkoutInProgressPageProps {
  workout: ActiveWorkout;
  log: WorkoutLog;
  onAddSet: (exerciseName: string) => void;
  onUpdateSet: (exerciseName: string, setIndex: number, field: keyof Set, value: string) => void;
  onFinish: () => void;
}

const WorkoutInProgressPage: React.FC<WorkoutInProgressPageProps> = ({ workout, log, onAddSet, onUpdateSet, onFinish }) => {
  return (
    <div className="p-6 space-y-6">
      <header className="space-y-1">
        <p className="text-blue-400 font-semibold">Week {workout.week}</p>
        <h1 className="text-3xl font-bold text-white">{workout.splitName}</h1>
      </header>
      
      <div className="space-y-4">
        {workout.exercises.map((exercise) => (
          <ExerciseTracker
            key={exercise.name}
            exercise={exercise}
            sets={log[exercise.name] || []}
            onAddSet={() => onAddSet(exercise.name)}
            onUpdateSet={(setIndex, field, value) => onUpdateSet(exercise.name, setIndex, field, value)}
          />
        ))}
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={onFinish}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-transform active:scale-95"
        >
          <Check size={20} />
          Finish
        </button>
      </div>
    </div>
  );
};

export default WorkoutInProgressPage;
