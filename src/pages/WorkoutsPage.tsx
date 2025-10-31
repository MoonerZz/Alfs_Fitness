import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Trash2 } from '../components/Icons';
import type { WorkoutProgram } from '../types';

interface WorkoutsPageProps {
  program: WorkoutProgram;
  setProgram: React.Dispatch<React.SetStateAction<WorkoutProgram>>;
}

const WorkoutsPage: React.FC<WorkoutsPageProps> = ({ program, setProgram }) => {
  const [openWeek, setOpenWeek] = useState<number | null>(null);

  const handleDeleteExercise = (weekNum: number, dayName: string, exerciseName: string) => {
    setProgram(prevProgram => {
      const newProgram = JSON.parse(JSON.stringify(prevProgram)) as WorkoutProgram;
      
      const week = newProgram.find(w => w.week === weekNum);
      if (!week) return prevProgram;
      
      const day = week.days.find(d => d.day === dayName);
      if (!day) return prevProgram;

      day.exercises = day.exercises.filter(ex => ex.name !== exerciseName);
      
      return newProgram;
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-white mb-4">12 Week Program</h1>
      {program.map((weekData) => (
        <div key={weekData.week} className="bg-slate-800 rounded-2xl shadow-lg">
          <button
            onClick={() => setOpenWeek(openWeek === weekData.week ? null : weekData.week)}
            className="w-full flex justify-between items-center p-5"
          >
            <span className="text-xl font-bold text-white">Week {weekData.week}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-400">{weekData.repRange}</span>
              {openWeek === weekData.week ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
          </button>
          
          {openWeek === weekData.week && (
            <div className="px-5 pb-5 space-y-3">
              {weekData.days.map((day) => (
                <div key={day.day} className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-lg font-semibold text-white">{day.day}: {day.splitName}</p>
                  <ul className="pl-2 text-gray-300 space-y-2 mt-2">
                    {day.exercises.map((ex) => (
                      <li key={ex.name} className="text-sm flex justify-between items-center">
                        <span>- {ex.name}</span>
                        <button 
                          onClick={() => handleDeleteExercise(weekData.week, day.day, ex.name)}
                          className="text-red-500 hover:text-red-400 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkoutsPage;
