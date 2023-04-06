export const addEntry = (entries, type) => {
  let newEntry;

  if (entries.length === 0) {
    switch (type) {
      case 'strength':
        newEntry = {isWarmUp: false, reps: 0, weight: 0, isDone: false};
        break;
      case 'calisthenics':
        newEntry = {isWarmUp: false, reps: 0, isDone: false};
        break;
      case 'calisthenics_time':
        newEntry = {isWarmUp: false, time: 0, isDone: false};
        break;
      case 'cardio':
        newEntry = {isWarmUp: false, time: 0, isDone: false};
        break;
      case 'cardio_speed':
        newEntry = {isWarmUp: false, time: 0, speed: 0, isDone: false};
        break;
      case 'cardio_distance':
        newEntry = {isWarmUp: false, time: 0, distance: 0, isDone: false};
        break;
      default: // strength
        newEntry = {isWarmUp: false, reps: 0, weight: 0, isDone: false};
        break;
    }
  } else {
    newEntry = {...entries[entries.length - 1]};
  }

  const newEntries = [...entries, newEntry];
  return newEntries;
};

export const handleWeightChange = (
  entries,
  setEntries,
  text, //이용자가 입력한 값
  index, //이벤트가 발생한 해당 entry index
  setWeightValue,
) => {
  let filteredText = text.replace(/[^0-9.]/g, ''); // 텍스트에 문자가 있으면 해당 문자를 공백으로 변환합니다.
  if (filteredText.endsWith('.')) {
    setWeightValue(filteredText);
    filteredText = filteredText.slice(0, -1);
  } else {
    setWeightValue(filteredText);
  }
  const finalText = filteredText === '' ? '0' : filteredText; // 최종 문자가 공백이면 entry에 값이 0으로 저장되도록 합니다.

  // 현재 수정한 entry의 인덱스 값과 일치하는 targetWorkout의 entry를 수정한 값으로 바꾸고 entry배열을 updeatedEntries에 저장합니ㅏㄷ.
  const updatedEntries = entries.map((entry, entryIndex) => {
    if (entryIndex === index) {
      return {...entry, weight: parseFloat(finalText)};
    } else {
      return entry;
    }
  });
  setEntries(updatedEntries);
};

export const handleSpeedChange = (
  entries,
  setEntries,
  text,
  index,
  setSpeedValue,
) => {
  let filteredText = text.replace(/[^0-9.]/g, '');

  if (filteredText.endsWith('.')) {
    setSpeedValue(filteredText);
    filteredText = filteredText.slice(0, -1);
  } else {
    setSpeedValue(filteredText);
  }
  const finalText = filteredText === '' ? '0' : filteredText;

  const updatedEntries = entries.map((entry, entryIndex) => {
    if (entryIndex === index) {
      return {...entry, speed: parseFloat(finalText)};
    } else {
      return entry;
    }
  });

  setEntries(updatedEntries);
};

export const handleDistanceChange = (
  entries,
  setEntries,
  text,
  index,
  setDistanceValue,
) => {
  let filteredText = text.replace(/[^0-9.]/g, '');

  if (filteredText.endsWith('.')) {
    setDistanceValue(filteredText);
    filteredText = filteredText.slice(0, -1);
  } else {
    setDistanceValue(filteredText);
  }
  const finalText = filteredText === '' ? '0' : filteredText;

  const updatedEntries = entries.map((entry, entryIndex) => {
    if (entryIndex === index) {
      return {...entry, distance: parseFloat(finalText)};
    } else {
      return entry;
    }
  });

  setEntries(updatedEntries);
};

export const handleTimeChange = (
  entries,
  setEntries,
  text,
  index,
  setTimeValue,
) => {
  const filteredText = text.replace(/[^0-9]/g, '');
  setTimeValue(filteredText);
  const finalText = filteredText === '' ? '0' : filteredText;

  const updatedEntries = entries.map((entry, entryIndex) => {
    if (entryIndex === index) {
      return {...entry, time: parseFloat(finalText)};
    } else {
      return entry;
    }
  });

  setEntries(updatedEntries);
};

export const handleRepsChange = (
  entries,
  setEntries,
  text,
  index,
  setRepsValue,
) => {
  const filteredText = text.replace(/[^0-9]/g, '');
  setRepsValue(filteredText);
  const finalText = filteredText === '' ? '0' : filteredText;

  const updatedEntries = entries.map((entry, entryIndex) => {
    if (entryIndex === index) {
      return {...entry, reps: parseFloat(finalText)};
    } else {
      return entry;
    }
  });
  setEntries(updatedEntries);
};

export const handleIsWarmUpChange = (entries, setEntries, index) => {
  const updatedEntries = entries.map((entry, entryIndex) => {
    if (entryIndex === index) {
      return {...entry, isWarmUp: !entry.isWarmUp};
    } else {
      return entry;
    }
  });
  setEntries(updatedEntries);
};
