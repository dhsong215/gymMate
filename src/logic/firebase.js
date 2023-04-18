import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

firestore().settings({
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
  persistence: true,
});

GoogleSignin.configure({
  webClientId:
    '977437828137-69tiaituq1rb6ct7thla85dkitp728se.apps.googleusercontent.com',
});

export const getUserRef = uid => firestore().collection('Users').doc(uid);

export async function uploadNewPlan(user, workouts, planTitle, date) {
  const exercisesData = workouts.map(workout => workout.exerciseId);
  const planData = {
    title: planTitle,
    date: date,
    startTimestamp: null,
    finishTimestamp: null,
    isDone: false,
    time: null,
    routine: null,
    workouts: workouts,
    exercises: exercisesData,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  const userRef = getUserRef(user.uid);
  const userPlanRef = userRef.collection('Plans');

  try {
    await userPlanRef.add(planData);
  } catch (error) {
    console.error(error);
  }
}

export async function uploadPlan(user, workouts, planTitle, plan, id) {
  const exercisesData = workouts.map(workout => workout.exerciseId);
  const planData = {
    ...plan,
    workouts,
    title: planTitle,
    exercises: exercisesData,
  };

  const userRef = getUserRef(user.uid);
  const userPlanDocRef = userRef.collection('Plans').doc(id);

  try {
    await userPlanDocRef.set(planData);
  } catch (error) {
    console.error(error);
  }
}

export async function uploadFinishedPlan(user, workouts, planTitle, plan, id) {
  const exercisesData = workouts.map(workout => workout.exerciseId);
  const planData = {
    ...plan,
    workouts,
    title: planTitle,
    exercises: exercisesData,
    finishTimestamp: firestore.FieldValue.serverTimestamp(),
    isDone: true,
  };

  const userRef = getUserRef(user.uid);
  const userPlanDocRef = userRef.collection('Plans').doc(id);

  try {
    await userPlanDocRef.set(planData);
  } catch (error) {
    console.error(error);
  }
}

export async function deletePlans(user, plans) {
  const userRef = getUserRef(user.uid);
  const userPlansRef = userRef.collection('Plans');

  const batch = firestore().batch();

  for (const planId of plans) {
    const planDocRef = userPlansRef.doc(planId);
    batch.delete(planDocRef);
  }

  try {
    await batch.commit();
    console.log('Deleted plans:', plans);
  } catch (error) {
    console.error('Error deleting plans:', error);
  }
}

export {firestore, auth, GoogleSignin};
