
import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown } from '../components/Icons';
import { calculate1RM } from '../utils/workout';
import type { HistoryEntry } from '../types';

interface HistoryPageProps {
  history: HistoryEntry[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryEntry[]>>;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, setHistory }) => {
    const [openId, setOpenId] = useState<string | null>(null);

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); 
        setHistory(prev => prev.filter(w => w.id !== id));
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-white mb-4">Workout History</h1>
            {history.length === 0 ? (
                <p className="text-gray-400 text-center">No workouts completed yet.</p>
            ) : (
                <div className="space-y-3">
                    {[...history].reverse().map((workout) => (
                        <div key={workout.id} className="bg-slate-800 rounded-2xl shadow-lg">
                            <button
                                onClick={() => setOpenId(openId === workout.id ? null : workout.id)}
                                className="w-full flex justify-between items-center p-5 text-left"
                            >
                                <div>
                                    <p className="text-lg font-bold text-white">Week {workout.week}, {workout.splitName}</p>
                                    <p className="text-sm text-gray-400">{workout.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={(e) => handleDelete(e, workout.id)}
                                        className="text-red-400 hover:text-red-500 p-1"
                                    >
                                        <X size={18} />
                                    </button>
                                    {openId === workout.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </div>
                            </button>

                            {openId === workout.id && (
                                <div className="px-5 pb-5 space-y-3">
                                    {Object.entries(workout.log).map(([exercise, sets]) => (
                                        <div key={exercise} className="bg-slate-700 p-3 rounded-lg">
                                            <p className="font-semibold text-white">{exercise}</p>
                                            <ul className="text-gray-300">
                                                {sets.map((set, i) => (
                                                    <li key={i} className="text-sm">
                                                        Set {i + 1}: {set.weight} kg x {set.reps} reps 
                                                        (1RM: {calculate1RM(set.weight, set.reps)} kg)
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
            )}
        </div>
    );
};

export default HistoryPage;
