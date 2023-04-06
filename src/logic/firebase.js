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

export const usersQuerySnapshot = firestore().collection('Users').get();

export async function uploadPlan(user, workouts, date) {
  const planData = {
    data: date,
    startTimestamp: null,
    finishTimestamp: null,
    isDone: false,
    workoutIds: workouts.map(workout => workout.workoutId),
    time: null,
    routine: null,
  };

  try {
    const batch = firestore().batch();

    // Plans 컬렉션에 문서 추가
    const newPlanRef = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Plans')
      .doc();
    batch.set(newPlanRef, planData);

    // Workouts 컬렉션에 참조 문서들 추가
    for (const workout of workouts) {
      const newWorkoutRef = firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Workouts')
        .doc(workout.workoutId);
      batch.set(newWorkoutRef, {planRef: newPlanRef, ...workout});
    }

    await batch.commit();
    console.log('Batch write successfully committed!');
  } catch (error) {
    console.error('Batch write failed: ', error);
  }
  console.log('Objects and ref objects uploaded successfully');
}

export {firestore, auth, GoogleSignin};
