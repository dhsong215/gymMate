import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

//context
import {ThemeColorsContext, UserContext} from '../contexts';

//logic
import {getUserRef, uploadNewRoutine, updateRoutine} from '../logic/firebase';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//components
import AddExerciseModal from '../components/modals/AddWorkoutModal';
import WorkoutsReorderModal from '../components/modals/WorkoutsReorderModal';
import WorkoutBox from '../components/WorkoutBox';

const Header = ({goBack, title, setWorkoutsReorderModalVisible}) => {
  const themeColors = useContext(ThemeColorsContext);

  return (
    <SafeAreaView style={{backgroundColor: themeColors.screenHeaderColors[1]}}>
      <View
        style={[
          styles.headerContainer,
          {backgroundColor: themeColors.screenHeaderColors[1]},
        ]}>
        <View style={styles.headerTopContainer}>
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => goBack()}>
            <Ionicons
              name="arrow-back"
              size={30}
              color={themeColors.textColor}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {color: themeColors.textColor}]}>
            {title}
          </Text>
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => {
              setWorkoutsReorderModalVisible(true);
            }}>
            <Ionicons
              name="list-circle-outline"
              size={35}
              color={themeColors.textColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function EditRoutineScreen({
  navigation: {setOptions, goBack},
  route: {params},
}) {
  const [workouts, setWorkouts] = useState(
    params.routine ? params.routine.workouts : [],
  );
  const [routineTitle, setRoutineTitle] = useState(
    params.routine ? params.routine.title : '내 루틴',
  );
  const [changedWorkout, setChangedWorkout] = useState();
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [workoutsReorderModalVisible, setWorkoutsReorderModalVisible] =
    useState(false);
  const [optionVisible, setOptionVisible] = useState([]);

  const themeColors = useContext(ThemeColorsContext);
  const {user} = useContext(UserContext);

  useEffect(() => {
    setOptions({
      header: () => (
        <Header
          goBack={goBack}
          title={routineTitle}
          setWorkoutsReorderModalVisible={setWorkoutsReorderModalVisible}
        />
      ),
    });
  }, [routineTitle]);

  useEffect(() => {
    if (changedWorkout) {
      const updatedWorkouts = workouts.map(workout => {
        if (changedWorkout.workoutId === workout.workoutId) {
          return {...changedWorkout};
        } else {
          return workout;
        }
      });
      setWorkouts(updatedWorkouts);
      setChangedWorkout();
    }
  }, [changedWorkout]);

  const flatListRef = useRef(null);

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* workout list */}

        <FlatList
          ref={flatListRef}
          style={{flex: 1}}
          contentContainerStyle={{paddingTop: 5, paddingBottom: 10}}
          data={workouts}
          keyExtractor={item => item.workoutId}
          renderItem={({item, index}) => {
            return (
              <WorkoutBox
                workoutData={item}
                optionVisible={optionVisible}
                setOptionVisible={setOptionVisible}
                isLastIndex={index === workouts.length - 1}
                flatListRef={flatListRef}
                setChangedWorkout={setChangedWorkout}
                isRoutine={true}
              />
            );
          }}
          ListFooterComponent={() => (
            <View
              style={{
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: themeColors.textColor}}>
                운동을 추가해 보세요
              </Text>
            </View>
          )}
        />

        {/* button container */}
        <View style={[styles.bottomButtonContainer]}>
          <TouchableOpacity
            style={[
              styles.bottomButton,
              {backgroundColor: themeColors.buttonColors[1]},
            ]}
            onPress={() => {
              setAddExerciseModalVisible(true);
            }}>
            <Text
              style={[styles.bottomButtonText, {color: themeColors.textColor}]}>
              운동 추가하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (params.id) {
                updateRoutine(user, workouts, routineTitle, params.id);
              } else {
                uploadNewRoutine(user, workouts, routineTitle);
              }
              goBack();
            }}
            style={[
              styles.bottomButton,
              {backgroundColor: themeColors.buttonColors[3]},
            ]}>
            <Text
              style={[styles.bottomButtonText, {color: themeColors.textColor}]}>
              저장
            </Text>
          </TouchableOpacity>
        </View>
        <WorkoutsReorderModal
          modalVisible={workoutsReorderModalVisible}
          setModalVisible={setWorkoutsReorderModalVisible}
          workouts={workouts}
          setWorkouts={setWorkouts}
          planTitle={routineTitle}
          setPlanTitle={setRoutineTitle}
        />
        <AddExerciseModal
          modalVisible={addExerciseModalVisible}
          setModalVisible={setAddExerciseModalVisible}
          setWorkouts={setWorkouts}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTopContainer: {
    flexDirection: 'row',
    padding: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBackButton: {},
  headerTitle: {fontSize: 20, fontWeight: '600', maxWidth: 300, maxHeight: 30},
  headerStateBox: {
    backgroundColor: 'white',
    height: 100,
    width: '92%',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  mainContainer: {
    flex: 1,
  },
  bottomButtonContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  bottomButton: {
    width: '50%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
