import React, {useContext, useEffect, useState, useRef} from 'react';
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
import {UserContext, ThemeColorsContext} from '../contexts';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//components
import AddExerciseModal from '../components/modals/AddExerciseModal';
import WorkoutsReorderModal from '../components/modals/WorkoutsReorderModal';
import WorkoutBox from '../components/WorkoutBox';

//logics
import {uploadNewPlan, uploadPlan} from '../logic/firebase';

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
        <View
          style={[
            styles.headerStateBox,
            {backgroundColor: themeColors.modalColors[1]},
          ]}></View>
      </View>
    </SafeAreaView>
  );
};

function EditPlanScreen({navigation: {setOptions, goBack}, route: {params}}) {
  const [workouts, setWorkouts] = useState(
    params.plan ? params.plan.workouts : [],
  );
  const [changedWorkout, setChangedWorkout] = useState();
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [workoutsReorderModalVisible, setWorkoutsReorderModalVisible] =
    useState(false);
  const [optionVisible, setOptionVisible] = useState([]);
  const [planTitle, setPlanTitle] = useState(
    params.plan ? params.plan.title : params.date + ' 운동',
  );

  const themeColors = useContext(ThemeColorsContext);
  const user = useContext(UserContext);

  useEffect(() => {
    setOptions({
      header: () => (
        <Header
          goBack={goBack}
          title={planTitle}
          setWorkoutsReorderModalVisible={setWorkoutsReorderModalVisible}
        />
      ),
    });
  }, [planTitle]);

  useEffect(() => {
    if (changedWorkout) {
      const updatedWorkouts = workouts.map(workout => {
        if (changedWorkout.workout.workoutId === workout.workoutId) {
          return {...changedWorkout.workout};
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
          contentContainerStyle={{paddingTop: 40, paddingBottom: 10}}
          data={workouts}
          keyExtractor={item => item.workoutId}
          renderItem={({item, index}) => {
            return (
              <WorkoutBox
                workout={item}
                optionVisible={optionVisible}
                setOptionVisible={setOptionVisible}
                isLastIndex={index === workouts.length - 1}
                flatListRef={flatListRef}
                setChangedWorkout={setChangedWorkout}
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
                uploadPlan(user, workouts, planTitle, params.plan, params.id);
              } else {
                uploadNewPlan(user, workouts, planTitle, params.date);
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
          planTitle={planTitle}
          setPlanTitle={setPlanTitle}
        />
        <AddExerciseModal
          modalVisible={addExerciseModalVisible}
          setModalVisible={setAddExerciseModalVisible}
          setWorkouts={setWorkouts}
          date={params.date}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default EditPlanScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 130,
  },
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
