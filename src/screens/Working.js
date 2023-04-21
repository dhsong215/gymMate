import React, {useContext, useEffect, useState, memo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {NowWorkingContext, ThemeColorsContext, UserContext} from '../contexts';

//logic
import {uploadFinishedPlan} from '../logic/firebase';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//components
import WorkoutPage from '../components/WorkoutPage';
import AddExerciseModal from '../components/modals/AddWorkoutModal';
import WorkoutsReorderModal from '../components/modals/WorkoutsReorderModal';

const Header = ({
  goBack,
  title,
  setWorkoutsReorderModalVisible,
  progress,
  timerOn,
  setTimerOn,
  planId,
}) => {
  const themeColors = useContext(ThemeColorsContext);
  const insets = useSafeAreaInsets();

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    if (timerOn) {
      setSecondsLeft(90);
      setTimerOn(false);
    }
  }, [timerOn]);

  //plan이 바뀌면 경과시간 0으로 설정하고 타이머 다시 시작
  useEffect(() => {
    const startTimer = () => {
      BackgroundTimer.runBackgroundTimer(() => {
        setSecondsElapsed(secs => secs + 1);
        setSecondsLeft(secs => {
          if (secs > 0) return secs - 1;
          else return 0;
        });
      }, 1000);
    };

    setSecondsElapsed(0);
    startTimer();

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [planId]);

  //휴식 타이머 00:00
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  //운동 경과 시간 00:00:00
  const elapsedClockify = () => {
    let hours = Math.floor(secondsElapsed / 60 / 60);
    let mins = Math.floor((secondsElapsed / 60) % 60);
    let seconds = Math.floor(secondsElapsed % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

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
          height: 90,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: themeColors.boxColors[0],
        }}>
        <View
          style={{
            width: '25%',
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Text style={{color: themeColors.textColor, fontSize: 13}}>
              진행도
            </Text>
            <Text
              style={{
                color: themeColors.textColor,
                fontSize: 22,
                fontWeight: '500',
              }}>
              {Math.floor(progress * 100)}%
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '75%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: themeColors.boxColors[1],
              width: '95%',
              height: 75,
              borderRadius: 11,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => {}}
              style={{width: 100, alignItems: 'center'}}>
              <Text style={{color: themeColors.textColor}}>휴식타이머</Text>
              <Text
                style={{
                  color: themeColors.textColor,
                  fontSize: 26,
                  fontWeight: '600',
                }}>
                {clockify().displayMins}:{clockify().displaySecs}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                height: '80%',
                width: 1,
                backgroundColor: themeColors.textColor,
                opacity: 0.2,
              }}></View>

            <View style={{width: 120, alignItems: 'center'}}>
              <Text style={{color: themeColors.textColor}}>경과 시간</Text>
              <Text
                style={{
                  color: themeColors.textColor,
                  fontSize: 26,
                  fontWeight: '600',
                }}>
                {elapsedClockify().displayHours}:{elapsedClockify().displayMins}
                :{elapsedClockify().displaySecs}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function WorkingScreen({
  navigation: {setOptions, goBack},
  route: {params: nowWorking},
}) {
  const themeColors = useContext(ThemeColorsContext);
  const {user} = useContext(UserContext);
  const {updateData} = useContext(NowWorkingContext);
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState();
  const [planId, setPlanId] = useState();
  const [workouts, setWorkouts] = useState();
  const [planTitle, setPlanTitle] = useState();
  const [changedWorkout, setChangedWorkout] = useState();
  const [workoutsReorderModalVisible, setWorkoutsReorderModalVisible] =
    useState(false);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const flatListRef = useRef(null);

  useEffect(() => {
    // const workoutProgress =
    setOptions({
      header: () => (
        <Header
          goBack={goBack}
          title={planTitle}
          setWorkoutsReorderModalVisible={setWorkoutsReorderModalVisible}
          progress={progress}
          timerOn={timerOn}
          setTimerOn={setTimerOn}
          planId={nowWorking.id}
        />
      ),
    });
  }, [planTitle, progress, timerOn, nowWorking]);

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
    const initScreen = () => {
      setPlan(nowWorking.planData);
      setPlanId(nowWorking.id);
      setWorkouts(nowWorking.planData.workouts);
      setPlanTitle(nowWorking.planData.title);
      setIsLoading(false);
    };
    initScreen();
  }, [nowWorking]);

  useEffect(() => {
    const setData = async () => {
      const data = {
        planData: {
          ...plan,
          workouts,
          title: planTitle,
          exercises: workouts.map(item => item.exerciseId),
        },
        id: planId,
      };
      updateData(data);
    };

    const currentProgress = () => {
      const finishedEntriesLength = workouts.reduce((acc, workout) => {
        const length = workout.entries.filter(
          entry => entry.isDone === true,
        ).length;
        return acc + length;
      }, 0);
      const allEntriesLength = workouts.reduce((acc, workout) => {
        return acc + workout.entries.length;
      }, 0);
      const progressData = isNaN(finishedEntriesLength / allEntriesLength)
        ? 0
        : finishedEntriesLength / allEntriesLength;
      setProgress(progressData);
    };

    if (workouts) {
      currentProgress();
      setData();
    }
  }, [workouts, planTitle]);

  const onPressDone = () => {
    const check = workouts.find(workout =>
      workout.entries.find(entry => entry.isDone === false),
    );
    if (check) {
      Alert.alert(
        '완료하지 않은 운동이 있습니다.',
        `${check.workoutName} \n 그래도 완료하시겠습니까?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              BackgroundTimer.stopBackgroundTimer();
              uploadFinishedPlan(user, workouts, planTitle, plan, planId);
              updateData({});
              goBack();
            },
          },
        ],
      );
    } else {
      BackgroundTimer.stopBackgroundTimer();
      uploadFinishedPlan(user, workouts, planTitle, plan, planId);
      updateData({});
      goBack();
    }
  };

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
                setTimerOn={setTimerOn}
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
          onPress={() => {
            onPressDone();
          }}
          style={[
            styles.bottomButton,
            {backgroundColor: themeColors.buttonColors[3]},
          ]}>
          <Text
            style={[styles.bottomButtonText, {color: themeColors.textColor}]}>
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
