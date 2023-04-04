export const addEntry = (entries, type) => {
  if (entries.length === 0) {
    const newEntry =
      type === 'strength'
        ? {isWarmUp: false, reps: 0, weight: 0, isDone: false}
        : type === 'calisthenics'
        ? {isWarmUp: false, reps: 0, isDone: false}
        : type === 'calisthenics_time'
        ? {isWarmUp: false, time: 0, isDone: false}
        : {isWarmUp: false, speed: 0, time: 0, distance: 0, isDone: false}; // cardio
    const newEntries = [...entries, newEntry];
    return newEntries;
  } else {
    const newEntry = {
      ...entries[entries.length - 1],
    };
    const newEntries = [...entries, newEntry];
    return newEntries;
  }
};
