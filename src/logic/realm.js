import Realm from 'realm';

const PlanSchema = {
  name: 'Plan',
  properties: {
    _id: 'string',
    createdAt: 'date',
    date: 'date',
    startTimestamp: 'date?',
    finishTimestamp: 'date?',
    isDone: 'boolean',
    title: 'string',
    routine: 'string?',
    workouts: ['Workout?'], //workout 레퍼런스 저장하기
  },
  primaryKey: '_id',
};

const WorkoutSchema = {
  name: 'Workout',
  properties: {
    _id: 'string',
    workoutName: 'string',
    memo: 'string',
    exercise: 'int',
    target: 'string',
    type: 'string',
    entries: ['Entry'],
  },
  primaryKey: '_id',
};

const EntrySchema = {
  name: 'Entry',
  properties: {
    _id: 'string',
    isDone: 'boolean',
    set: 'string',
    weight: 'float?',
    reps: 'int?',
    distance: 'float?',
    speed: 'float?',
    time: 'int?', //분 단위
  },
  primaryKey: '_id',
};

async function initRealm() {
  const realm = await Realm.open({
    schema: [PlanSchema, WorkoutSchema, EntrySchema],
  });
  return realm;
}

async function addExercise(realm, exercise) {
  realm.write(() => {
    realm.create('Exercise', exercise);
  });
}

async function getExercises(realm) {
  return realm.objects('Exercise');
}
