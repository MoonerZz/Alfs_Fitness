import type { WorkoutProgram, WorkoutDay } from './types';

const PROGRAM_WEEKS = 12;

const getRepRange = (week: number): string => {
  if (week <= 4) return '12-15 reps';
  if (week <= 8) return '8-12 reps';
  return '6-10 reps';
};

const getTargetSets = (week: number): number => {
    if (week <= 4) return 3;
    if (week <= 8) return 3;
    return 4; // Increase volume in the last block
};

const createWorkoutDay = (dayName: string, exercises: string[], week: number): WorkoutDay => {
  const targetSets = getTargetSets(week);
  const repRange = getRepRange(week);
  const splitNameMap: { [key: string]: string } = {
    'Day 1': 'Chest & Triceps',
    'Day 2': 'Back & Biceps',
    'Day 3': 'Legs',
    'Day 4': 'Shoulders & Triceps',
    'Day 5': 'Full Body / Focus',
  };

  return {
    day: dayName,
    splitName: splitNameMap[dayName],
    exercises: exercises.map(name => ({
      name,
      targetSets,
      targetReps: repRange,
    })),
  };
};

export const defaultWorkoutProgram: WorkoutProgram = Array.from({ length: PROGRAM_WEEKS }, (_, i) => {
  const week = i + 1;
  return {
    week,
    repRange: getRepRange(week),
    days: [
      createWorkoutDay('Day 1', [
        'Bench Press (Barbell or Dumbbell)',
        'Incline Dumbbell Press',
        'Cable Flys',
        'Tricep Pushdowns',
        'Overhead Tricep Extension',
        'Dips (Assisted or Bodyweight)',
      ], week),
      createWorkoutDay('Day 2', [
        'Lat Pulldowns (or Pull-ups)',
        'Bent-Over Rows (Barbell or Dumbbell)',
        'Seated Cable Rows',
        'Dumbbell Pullovers',
        'Bicep Curls (Dumbbell or Barbell)',
        'Hammer Curls',
      ], week),
      createWorkoutDay('Day 3', [
        'Squats (Barbell or Goblet)',
        'Leg Press',
        'Romanian Deadlifts (Dumbbell or Barbell)',
        'Leg Extensions',
        'Hamstring Curls',
        'Calf Raises',
      ], week),
      createWorkoutDay('Day 4', [
        'Overhead Press (Dumbbell or Barbell)',
        'Dumbbell Lateral Raises',
        'Front Raises (Plate or Dumbbell)',
        'Reverse Pec Deck (or Face Pulls)',
        'Close Grip Bench Press',
        'Single Arm Tricep Pushdown',
      ], week),
      createWorkoutDay('Day 5', [
        'Deadlifts (light, focus on form)',
        'Incline Bench Press',
        'Single-Arm Dumbbell Row',
        'Walking Lunges',
        'Bicep Curls',
        'Plank',
      ], week),
    ],
  };
});
