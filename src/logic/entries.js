export const addEntry = targetWorkout => {
  if (targetWorkout.entries.length === 0) {
    const newEntry =
      targetWorkout.type === 'strength'
        ? {isWarmUp: false, reps: 0, weight: 0}
        : targetWorkout.type === 'calisthenics'
        ? {isWarmUp: false, reps: 0}
        : targetWorkout.type === 'calisthenics_time'
        ? {isWarmUp: false, time: 0}
        : {isWarmUp: false, speed: 0, time: 0, distance: 0}; // cardio
    const newEntries = [...targetWorkout.entries, newEntry];
    let workout = targetWorkout;
    workout.entries = newEntries;
    return workout;
  } else {
    const newEntry = {
      ...targetWorkout.entries[targetWorkout.entries.length - 1],
    };
    const newEntries = [...targetWorkout.entries, newEntry];
    let workout = targetWorkout;
    workout.entries = newEntries;
    return workout;
  }
};
