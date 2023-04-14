import React, {useContext, useEffect, useState, memo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {NowWorkingContext, ThemeColorsContext} from '../contexts';

//logic
import {getData, storeData} from '../logic/asyncStorage';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//components
import WorkoutPage from '../components/WorkoutPage';
import AddExerciseModal from '../components/modals/AddExerciseModal';
import WorkoutsReorderModal from '../components/modals/WorkoutsReorderModal';

const WINDOW_WIDTH = Dimensions.get('window').width;

const Header = ({goBack, title, setWorkoutsReorderModalVisible}) => {
  const themeColors = useContext(ThemeColorsContext);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerContainer,
        {paddingTop: insets.top, backgroundColor: themeColors.backgroundColor},
      ]}>
      <View style={styles.headerTopContainer}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={30} color={themeColors.textColor} />
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
        style={{
          backgroundColor: 'grey',
          height: 90,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>타이머</Text>
      </View>
    </View>
  );
};

export default function WorkingScreen({
  navigation: {setOptions, goBack},
  route: {params},
}) {
  const themeColors = useContext(ThemeColorsContext);
  const {nowWorking, updateData} = useContext(NowWorkingContext);
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState();
  const [workouts, setWorkouts] = useState();
  const [planTitle, setPlanTitle] = useState();
  const [changedWorkout, setChangedWorkout] = useState();
  const [workoutsReorderModalVisible, setWorkoutsReorderModalVisible] =
    useState(false);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const flatListRef = useRef(null);

  useEffect(() => {
    setOptions({
      header: () => (
        <Header
          goBack={goBack}
          title={isLoading ? 'loading' : planTitle}
          setWorkoutsReorderModalVisible={setWorkoutsReorderModalVisible}
        />
      ),
    });
  }, [planTitle, isLoading]);

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('nowWorkingPlan');
      setPlan(data);
      setWorkouts(data.workouts);
      setPlanTitle(data.title);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const setData = async () => {
      const data = {
        ...plan,
        workouts,
        planTitle,
        exercises: workouts.map(item => item.exerciseId),
      };
      updateData(data);
    };
    if (workouts) {
      setData();
    }
  }, [workouts, planTitle]);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: themeColors.backgroundColor,
          paddingBottom: insets.bottom,
        },
      ]}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.mainContainer}
        keyboardVerticalOffset={120}>
        {/* workout list */}
        <FlatList
          ref={flatListRef}
          data={workouts}
          extraData={workouts}
          renderItem={({item, index}) => {
            const workoutIndex = `${index + 1} / ${workouts.length}`;
            return (
              <WorkoutPage
                refrehsingPage={refreshing}
                workoutIndex={workoutIndex}
                workoutData={item}
                setChangedWorkout={setChangedWorkout}
              />
            );
          }}
          keyExtractor={(_, index) => 'workoutWorking' + index}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        />
      </KeyboardAvoidingView>
      {/* 운동추가, 완료 버튼 */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            setAddExerciseModalVisible(true);
          }}
          style={[
            styles.bottomButton,
            {backgroundColor: themeColors.buttonColors[1]},
          ]}>
          <Text
            style={[styles.bottomButtonText, {color: themeColors.textColor}]}>
            운동 추가
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {backgroundColor: themeColors.buttonColors[5]},
          ]}>
          <Text style={[styles.bottomButtonText, {color: 'black'}]}>
            운동 완료
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTopContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {fontSize: 18, fontWeight: '600', maxWidth: 300, maxHeight: 30},
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  bottomButton: {
    width: 185,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 20,
    fontWeight: '400',
  },
});
