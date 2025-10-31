
export interface Set {
  reps: number;
  weight: number;
}

export interface Exercise {
  name: string;
  targetSets: number;
  targetReps: string;
}

export interface WorkoutDay {
  day: string;
  splitName: string;
  exercises: Exercise[];
}

export interface WorkoutWeek {
  week: number;
  repRange: string;
  days: WorkoutDay[];
}

export type WorkoutProgram = WorkoutWeek[];

export type WorkoutLog = {
  [exerciseName: string]: Set[];
};

export interface HistoryEntry {
  id: string;
  date: string;
  week: number;
  splitName: string;
  log: WorkoutLog;
}

export interface Measurement {
  id: string;
  date: string;
  weight: number | null;
  arm: number | null;
  chest: number | null;
  leg: number | null;
}

export interface FunMetrics {
  totalKg: number;
  totalReps: number;
  totalSets: number;
}

export interface ActiveWorkout extends WorkoutDay {
    week: number;
}

export type Page = 'home' | 'workouts' | 'progress' | 'history' | 'workout';
