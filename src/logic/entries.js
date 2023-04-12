export const addEntry = (entries, type) => {
  let newEntry;

  if (entries.length === 0) {
    switch (type) {
      case 'strength':
        newEntry = {set: 'normal', reps: 0, weight: 0, isDone: false};
        break;
      case 'calisthenics':
        newEntry = {set: 'normal', reps: 0, isDone: false};
        break;
      case 'calisthenics_time':
        newEntry = {set: 'normal', time: 0, isDone: false};
        break;
      case 'cardio':
        newEntry = {set: 'normal', time: 0, isDone: false};
        break;
      case 'cardio_speed':
        newEntry = {set: 'normal', time: 0, speed: 0, isDone: false};
        break;
      case 'cardio_distance':
        newEntry = {set: 'normal', time: 0, distance: 0, isDone: false};
        break;
      default: // strength
        newEntry = {set: 'normal', reps: 0, weight: 0, isDone: false};
        break;
    }
  } else {
    newEntry = {...entries[entries.length - 1]};
  }

  const newEntries = [...entries, newEntry];
  return newEntries;
};

export const handleWeightChange = (entry, text, setWeightValue) => {
  let filteredText = text.replace(/[^0-9.]/g, ''); // 텍스트에 문자가 있으면 해당 문자를 공백으로 변환합니다.
  if (filteredText.endsWith('.')) {
    setWeightValue(filteredText);
    filteredText = filteredText.slice(0, -1);
  } else {
    setWeightValue(filteredText);
  }
  const finalText = filteredText === '' ? '0' : filteredText; // 최종 문자가 공백이면 entry에 값이 0으로 저장되도록 합니다.

  return {...entry, weight: parseFloat(finalText)};
};

export const handleSpeedChange = (entry, text, setSpeedValue) => {
  let filteredText = text.replace(/[^0-9.]/g, '');

  if (filteredText.endsWith('.')) {
    setSpeedValue(filteredText);
    filteredText = filteredText.slice(0, -1);
  } else {
    setSpeedValue(filteredText);
  }
  const finalText = filteredText === '' ? '0' : filteredText;

  return {...entry, speed: parseFloat(finalText)};
};

export const handleDistanceChange = (entry, text, setDistanceValue) => {
  let filteredText = text.replace(/[^0-9.]/g, '');

  if (filteredText.endsWith('.')) {
    setDistanceValue(filteredText);
    filteredText = filteredText.slice(0, -1);
  } else {
    setDistanceValue(filteredText);
  }
  const finalText = filteredText === '' ? '0' : filteredText;

  return {...entry, distance: parseFloat(finalText)};
};

export const handleTimeChange = (entry, text, setTimeValue) => {
  const filteredText = text.replace(/[^0-9]/g, '');
  setTimeValue(filteredText);
  const finalText = filteredText === '' ? '0' : filteredText;

  return {...entry, time: parseFloat(finalText)};
};

export const handleRepsChange = (entry, text, setRepsValue) => {
  const filteredText = text.replace(/[^0-9]/g, '');
  setRepsValue(filteredText);
  const finalText = filteredText === '' ? '0' : filteredText;

  return {...entry, reps: parseFloat(finalText)};
};

export const handleSetChange = (entries, setEntries, index) => {
  const updatedEntries = entries.map((entry, entryIndex) => {
    if (entryIndex === index) {
      return {...entry, isWarmUp: !entry.isWarmUp};
    } else {
      return entry;
    }
  });
  setEntries(updatedEntries);
};
