import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';

//context
import {themeColorsContext} from '../contexts';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//components
import AddExerciseModal from '../components/addExerciseModal';

const Header = ({goBack, title, setOptionVisible}) => {
  const themeColors = useContext(themeColorsContext);

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
            onPress={() => setOptionVisible()}>
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

const RenderItem = ({
  item,
  optionVisible,
  setOptionVisible,
  workouts,
  setWorkouts,
  workoutContainerIndex,
}) => {
  const themeColors = useContext(themeColorsContext);

  const onPressPlus = () => {
    const data = workouts.map((a, index) => {
      if (index === workoutContainerIndex) {
        const newEntries = [
          ...a.entries,
          a.type === 'strength'
            ? {state: 'normal', reps: 0, weight: 0}
            : a.type === 'calisthenics'
            ? {state: 'normal', reps: 0}
            : {speed: 0, time: 0, distance: 0},
        ];
        const clonedObj = {...a, entries: newEntries};
        return clonedObj;
      } else {
        return a;
      }
    });
    setWorkouts(data);
  };
  const onPressMinus = () => {
    const data = workouts.map((a, index) => {
      if (index === workoutContainerIndex) {
        const newEntries = a.entries.slice(0, -1);
        const clonedObj = {...a, entries: newEntries};
        return clonedObj;
      } else {
        return a;
      }
    });
    setWorkouts(data);
  };

  return (
    <View
      style={[
        styles.workoutContainer,
        {backgroundColor: themeColors.boxColors[0]},
      ]}>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext({
            duration: 200,
            update: {type: 'spring', springDamping: 0.6},
          });
          if (workoutContainerIndex === optionVisible) {
            setOptionVisible();
            return;
          }
          setOptionVisible(workoutContainerIndex);
        }}>
        <Text style={[styles.workoutTitle, {color: themeColors.textColor}]}>
          {item.workoutName}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          display: workoutContainerIndex === optionVisible ? 'flex' : 'none',
        }}>
        {item.entries.map(entries => {
          if (item.type === 'strength') {
            //개수 무게
          }
        })}
        <View>
          <FlatList
            data={item.entries}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: 'grey',
                  marginVertical: 3,
                }}>
                <Text>{index + 1}</Text>
                <Text>{item.weight}</Text>
                <Text>{item.reps}</Text>
                <Text>{item.state}</Text>
              </View>
            )}
            keyExtractor={(item, index) =>
              `workout${workoutContainerIndex}${index}`
            }
          />
        </View>

        <View style={[styles.editBottomButtonContainer]}>
          <TouchableOpacity
            onPress={() => onPressMinus()}
            style={[styles.editBottomButton]}></TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressPlus()}
            style={[styles.editBottomButton]}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function AddPlanScreen({navigation: {setOptions, goBack}, route: {params}}) {
  const [workouts, setWorkouts] = useState([]);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState();

  const themeColors = useContext(themeColorsContext);

  useEffect(() => {
    setOptions({
      header: () => (
        <Header
          goBack={goBack}
          title={params.date}
          setOptionVisible={setOptionVisible}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      {/* workout list */}

      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 40, paddingBottom: 10}}
        data={workouts}
        keyExtractor={(item, index) => `workout_${index}`}
        renderItem={({item, index}) => {
          return (
            <RenderItem
              item={item}
              optionVisible={optionVisible}
              setOptionVisible={setOptionVisible}
              workouts={workouts}
              setWorkouts={setWorkouts}
              workoutContainerIndex={index}
            />
          );
        }}
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
      <AddExerciseModal
        modalVisible={addExerciseModalVisible}
        setModalVisible={setAddExerciseModalVisible}
        setWorkouts={setWorkouts}
      />
    </SafeAreaView>
  );
}

export default AddPlanScreen;

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
  headerTitle: {fontSize: 20, fontWeight: '600'},
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
  workoutContainer: {padding: 15, marginBottom: 5},
  workoutTitle: {fontSize: 20},
  bottomButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    bottom: 0,
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
  editBottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editBottomButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'grey',
  },
});
