import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultWorkoutProgram } from './constants';
import BottomNav from './components/BottomNav';
import FloatingRestTimer from './components/FloatingRestTimer';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/WorkoutsPage';
import ProgressPage from './pages/ProgressPage';
import HistoryPage from './pages/HistoryPage';
import WorkoutInProgressPage from './pages/WorkoutInProgressPage';
import type { Page, HistoryEntry, Measurement, WorkoutProgram, ActiveWorkout, WorkoutLog } from './types';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('alfieWorkoutHistory', []);
  const [measurements, setMeasurements] = useLocalStorage<Measurement[]>('alfieMeasurements', []);
  const [program, setProgram] = useLocalStorage<WorkoutProgram>('alfieWorkoutProgram', defaultWorkoutProgram);
  
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(null);
  const [workoutLog, setWorkoutLog] = useState<WorkoutLog>({});

  const funMetrics = useMemo(() => {
    let totalKg = 0;
    let totalReps = 0;
    let totalSets = 0;

    history.forEach(workout => {
      if (!workout.log) return;
      Object.values(workout.log).forEach(setsArray => {
        if (Array.isArray(setsArray)) {
          totalSets += setsArray.length;
          setsArray.forEach(set => {
            totalReps += set.reps || 0;
            totalKg += (set.weight || 0) * (set.reps || 0);
          });
        }
      });
    });

    return { totalKg, totalReps, totalSets };
  }, [history]);

  const { nextWeek, nextDayIndex } = useMemo(() => {
    if (history.length === 0) {
      return { nextWeek: 1, nextDayIndex: 0 };
    }
    const lastWorkout = history[history.length - 1];
    
    const lastWeekData = program.find(w => w.week === lastWorkout.week);
    if (!lastWeekData) {
        return { nextWeek: 1, nextDayIndex: 0 };
    }

    const lastDayIndex = lastWeekData.days.findIndex(
      (d) => d.splitName === lastWorkout.splitName
    );

    if (lastDayIndex === -1 || lastDayIndex === lastWeekData.days.length - 1) {
      if (lastWorkout.week === program.length) {
        return { nextWeek: 1, nextDayIndex: 0 };
      }
      const nextWeekData = program.find(w => w.week === lastWorkout.week + 1);
      if (nextWeekData) {
        return { nextWeek: nextWeekData.week, nextDayIndex: 0 };
      } else {
        return { nextWeek: 1, nextDayIndex: 0 };
      }
    }
    
    return { nextWeek: lastWorkout.week, nextDayIndex: lastDayIndex + 1 };
  }, [history, program]);

  const nextWorkout = useMemo(() => {
    const weekData = program.find(w => w.week === nextWeek);
    if (weekData && weekData.days[nextDayIndex]) {
      return weekData.days[nextDayIndex];
    }
    return program[0]?.days[0] || defaultWorkoutProgram[0].days[0];
  }, [program, nextWeek, nextDayIndex]);

  const handleStartWorkout = () => {
    setActiveWorkout({
      week: nextWeek,
      ...nextWorkout,
    });
    setWorkoutLog({});
    setPage('workout');
  };

  const handleStartSpecificWorkout = (weekNum: number, dayIndex: number) => {
    const weekData = program.find(w => w.week === weekNum);
    if (!weekData) return;
    const dayData = weekData.days[dayIndex];
    if (!dayData) return;

    setActiveWorkout({
      week: weekData.week,
      ...dayData,
    });
    setWorkoutLog({});
    setPage('workout');
  };

  const handleAddSet = (exerciseName: string) => {
    const newSet = { reps: 0, weight: 0 };
    setWorkoutLog((prevLog) => {
      const sets = prevLog[exerciseName] || [];
      return {
        ...prevLog,
        [exerciseName]: [...sets, newSet],
      };
    });
  };

  const handleUpdateSet = (exerciseName: string, setIndex: number, field: 'reps' | 'weight', value: string) => {
    setWorkoutLog((prevLog) => {
      const sets = [...(prevLog[exerciseName] || [])];
      const numValue = Number(value);
      sets[setIndex] = {
        ...sets[setIndex],
        [field]: numValue < 0 ? 0 : numValue,
      };
      return {
        ...prevLog,
        [exerciseName]: sets,
      };
    });
  };

  const handleFinishWorkout = () => {
    if (!activeWorkout) return;
    const finishedWorkout: HistoryEntry = {
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      week: activeWorkout.week,
      splitName: activeWorkout.splitName,
      log: workoutLog,
    };
    setHistory((prevHistory) => [...prevHistory, finishedWorkout]);
    setActiveWorkout(null);
    setWorkoutLog({});
    setPage('home');
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <HomePage 
            onStartWorkout={handleStartWorkout} 
            nextWorkout={nextWorkout} 
            week={nextWeek}
            history={history}
            program={program}
            onStartSpecificWorkout={handleStartSpecificWorkout}
            funMetrics={funMetrics}
          />
        );
      case 'workouts':
        return <WorkoutsPage program={program} setProgram={setProgram} />;
      case 'progress':
        return <ProgressPage measurements={measurements} setMeasurements={setMeasurements} history={history} />;
      case 'history':
        return <HistoryPage history={history} setHistory={setHistory} />;
      case 'workout':
        if (activeWorkout) {
            return (
              <WorkoutInProgressPage
                workout={activeWorkout}
                log={workoutLog}
                onAddSet={handleAddSet}
                onUpdateSet={handleUpdateSet}
                onFinish={handleFinishWorkout}
              />
            );
        }
        setPage('home'); // Fallback if no active workout
        return null;
      default:
        return <HomePage 
          onStartWorkout={handleStartWorkout} 
          nextWorkout={nextWorkout} 
          week={nextWeek} 
          history={history}
          program={program}
          onStartSpecificWorkout={handleStartSpecificWorkout}
          funMetrics={funMetrics}
        />;
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-slate-900 text-gray-200">
      <main className="flex-grow overflow-y-auto pb-20">
        {renderPage()}
      </main>
      {page === 'workout' && <FloatingRestTimer />}
      <BottomNav currentPage={page} setPage={setPage} />
    </div>
  );
}
