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
import {ThemeColorsContext} from '../contexts';

//logic
import {getData, storeData} from '../logic/asyncStorage';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

//components
import Entry from '../components/Entry';
import AddExerciseModal from '../components/modals/AddExerciseModal';
import WorkoutsReorderModal from '../components/modals/WorkoutsReorderModal';

const WINDOW_WIDTH = Dimensions.get('window').width;

const Header = ({goBack, title, setWorkoutsReorderModalVisible}) => {
  const themeColors = useContext(ThemeColorsContext);

  return (
    <SafeAreaView style={{backgroundColor: themeColors.screenHeaderColors[1]}}>
      <View style={[styles.headerContainer]}>
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
    </SafeAreaView>
  );
};

const WorkoutPage = memo(({workoutData, workoutIndex, setChangedWorkout}) => {
  const themeColors = useContext(ThemeColorsContext);

  const [workout, setWorkout] = useState(workoutData);
  const [entries, setEntries] = useState(workoutData.entries);
  const [changedEntry, setChangedEntry] = useState();
  const [refreshing, setRefreshing] = useState(false);

  //workoutData바뀌면 실행
  useEffect(() => {
    setChangedWorkout({...workout});
  }, [workout]);

  //entr배열이 변경되면 실행
  useEffect(() => {
    setWorkout(pre => ({...pre, entries: entries}));
  }, [entries]);

  //entry가 변경되면 실행
  useEffect(() => {
    if (changedEntry) {
      const updatedEntries = entries.map((entry, index) => {
        if (changedEntry.index === index) {
          return {...changedEntry.entry};
        } else {
          return entry;
        }
      });
      setEntries(updatedEntries);
      setChangedEntry();
    }
  }, [changedEntry]);

  return (
    <View style={styles.workoutPageContainer}>
      <Text style={[styles.workoutIndex, {color: themeColors.textColor}]}>
        {workoutIndex}
      </Text>
      <Text style={[styles.workoutName, {color: themeColors.textColor}]}>
        {workout.workoutName}
      </Text>
      <Text style={[styles.workoutTarget, {color: themeColors.textColor}]}>
        {workout.target}
      </Text>

      {/* 그래프 자리 */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 200,
        }}>
        <View
          style={{
            backgroundColor: 'grey',
            width: 150,
            height: 150,
            borderRadius: 75,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: themeColors.backgroundColor,
              width: 120,
              height: 120,
              borderRadius: 60,
            }}></View>
        </View>
      </View>

      <ScrollView>
        {entries.map((entry, index) => (
          <Entry
            key={`${workout.workoutId}${index}`}
            index={index}
            item={entry}
            refreshing={refreshing}
            setChangedEntry={setChangedEntry}
          />
        ))}
      </ScrollView>
    </View>
  );
});

export default function WorkingScreen({
  navigation: {setOptions, goBack},
  route: {params},
}) {
  const themeColors = useContext(ThemeColorsContext);

  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState();
  const [workouts, setWorkouts] = useState();
  const [planTitle, setPlanTitle] = useState();
  const [changedWorkout, setChangedWorkout] = useState();
  const [workoutsReorderModalVisible, setWorkoutsReorderModalVisible] =
    useState(false);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);

  const flatListRef = useRef(null);

  setOptions({
    header: () => (
      <Header
        goBack={goBack}
        title={isLoading ? 'Working' : planTitle}
        setWorkoutsReorderModalVisible={setWorkoutsReorderModalVisible}
      />
    ),
  });

  console.log(workouts);

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
      const data = {...plan, workouts};
      await storeData('nowWorkingPlan', data);
    };
    setData();
  }, [workouts]);

  useEffect(() => {
    const setData = async () => {
      const data = {...plan, title: planTitle};
      await storeData('nowWorkingPlan', data);
    };
    setData();
  }, [planTitle]);

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
          data={workouts}
          extraData={workouts}
          renderItem={({item, index}) => {
            const workoutIndex = `${index + 1} / ${workouts.length}`;
            return (
              <WorkoutPage
                workoutIndex={workoutIndex}
                workoutData={item}
                setChangedWorkout={setChangedWorkout}
              />
            );
          }}
          keyExtractor={(_, index) => 'workout' + index}
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
    </SafeAreaView>
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
  workoutPageContainer: {width: WINDOW_WIDTH, padding: 10},
  workoutIndex: {opacity: 0.7, marginBottom: 8},
  workoutName: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 3,
  },
  workoutTarget: {
    opacity: 0.7,
    fontSize: 17,
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
