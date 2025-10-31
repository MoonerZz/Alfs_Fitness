import React, { useState, useMemo } from 'react';
import SparklineGraph from '../components/SparklineGraph';
import { calculate1RM } from '../utils/workout';
import type { Measurement, HistoryEntry } from '../types';

interface ProgressPageProps {
  measurements: Measurement[];
  setMeasurements: React.Dispatch<React.SetStateAction<Measurement[]>>;
  history: HistoryEntry[];
}

const ProgressPage: React.FC<ProgressPageProps> = ({ measurements, setMeasurements, history }) => {
  const [weight, setWeight] = useState('');
  const [arm, setArm] = useState('');
  const [chest, setChest] = useState('');
  const [leg, setLeg] = useState('');
  
  const handleSaveMeasurement = () => {
    if (!weight && !arm && !chest && !leg) return;
    
    setMeasurements(prev => [
      {
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        weight: Number(weight) || null,
        arm: Number(arm) || null,
        chest: Number(chest) || null,
        leg: Number(leg) || null,
      },
      ...prev
    ]);
    
    setWeight('');
    setArm('');
    setChest('');
    setLeg('');
  };

  const progressData = useMemo(() => {
    const exerciseMap = new Map<string, { date: string, value: number }[]>();
    
    [...history].forEach(workout => {
      Object.entries(workout.log).forEach(([exerciseName, sets]) => {
        if (!exerciseMap.has(exerciseName)) {
          exerciseMap.set(exerciseName, []);
        }
        
        const best1RM = sets.reduce((max, set) => {
          const current1RM = calculate1RM(set.weight, set.reps);
          return current1RM > max ? current1RM : max;
        }, 0);
        
        if (best1RM > 0) {
          exerciseMap.get(exerciseName)?.push({
            date: workout.date,
            value: best1RM,
          });
        }
      });
    });
    return exerciseMap;
  }, [history]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white mb-4">Progress</h1>
      
      <div className="bg-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-white">Log Measurements</h2>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-slate-700 text-white p-2 rounded-lg" />
          <input type="number" placeholder="Arm (cm)" value={arm} onChange={e => setArm(e.target.value)} className="w-full bg-slate-700 text-white p-2 rounded-lg" />
          <input type="number" placeholder="Chest (cm)" value={chest} onChange={e => setChest(e.target.value)} className="w-full bg-slate-700 text-white p-2 rounded-lg" />
          <input type="number" placeholder="Leg (cm)" value={leg} onChange={e => setLeg(e.target.value)} className="w-full bg-slate-700 text-white p-2 rounded-lg" />
        </div>
        <button onClick={handleSaveMeasurement} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg">
          Save Measurement
        </button>
        
        <div className="space-y-2 pt-4">
            <h3 className="text-lg font-semibold text-white">Recent Logs</h3>
            {measurements.length === 0 ? (
                <p className="text-gray-400 text-sm">No measurements logged yet.</p>
            ) : (
                measurements.slice(0, 5).map(m => (
                    <div key={m.id} className="bg-slate-700 p-3 rounded-lg text-sm">
                        <p className="font-bold text-white">{m.date}</p>
                        <p className="text-gray-300">
                           {m.weight && `Weight: ${m.weight}kg `}
                           {m.arm && `Arm: ${m.arm}cm `}
                           {m.chest && `Chest: ${m.chest}cm `}
                           {m.leg && `Leg: ${m.leg}cm `}
                        </p>
                    </div>
                ))
            )}
        </div>
      </div>
      
      <div className="bg-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-white">Lift Progress (1RM)</h2>
          {progressData.size === 0 ? (
            <p className="text-gray-400 text-sm">Complete workouts to see progress.</p>
          ) : (
            Array.from(progressData.entries()).map(([exerciseName, data]) => (
              <div key={exerciseName} className="bg-slate-700 p-3 rounded-lg">
                <p className="font-bold text-white">{exerciseName}</p>
                <SparklineGraph data={data} />
                <div className="flex justify-between text-xs text-gray-400">
                    <span>{data[0].date}</span>
                    <span>{data[data.length - 1].date}</span>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default ProgressPage;
