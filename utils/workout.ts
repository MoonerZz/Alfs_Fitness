
// Epley formula for 1 Rep Max
export const calculate1RM = (weight: number, reps: number): number => {
  if (!weight || !reps || reps === 0 || weight === 0) return 0;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
};
