import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
  TextInput,
} from 'react-native';

//context
import {themeColorsContext} from '../contexts';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//components
import AddExerciseModal from '../components/addExerciseModal';
import {addEntry} from '../logic/entries';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
          <TouchableOpacity style={styles.headerBackButton} onPress={() => {}}>
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
    const targetWorkout = {...workouts[workoutContainerIndex]};
    const updatedWorkout = addEntry(targetWorkout);
    const updatedWorkouts = [
      ...workouts.slice(0, workoutContainerIndex),
      updatedWorkout,
      ...workouts.slice(workoutContainerIndex + 1),
    ];
    setWorkouts(updatedWorkouts);
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
  const handleWeightChange = (text, index) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    const finalText = filteredText === '' ? '0' : filteredText;
    const targetWorkout = {...workouts[workoutContainerIndex]};
    const updatedEntries = targetWorkout.entries.map((entry, entryIndex) => {
      if (entryIndex === index) {
        return {...entry, weight: parseFloat(finalText)};
      } else {
        return entry;
      }
    });
    const updatedWorkout = {...targetWorkout, entries: updatedEntries};
    const updatedWorkouts = [
      ...workouts.slice(0, workoutContainerIndex),
      updatedWorkout,
      ...workouts.slice(workoutContainerIndex + 1),
    ];
    setWorkouts(updatedWorkouts);
  };
  const handleRepsChange = (text, index) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    const finalText = filteredText === '' ? '0' : filteredText;
    const targetWorkout = {...workouts[workoutContainerIndex]};
    const updatedEntries = targetWorkout.entries.map((entry, entryIndex) => {
      if (entryIndex === index) {
        return {...entry, reps: parseFloat(finalText)};
      } else {
        return entry;
      }
    });
    const updatedWorkout = {...targetWorkout, entries: updatedEntries};
    const updatedWorkouts = [
      ...workouts.slice(0, workoutContainerIndex),
      updatedWorkout,
      ...workouts.slice(workoutContainerIndex + 1),
    ];
    setWorkouts(updatedWorkouts);
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
            duration: 300,
            update: {type: 'spring', springDamping: 0.8},
          });
          if (optionVisible.includes(workoutContainerIndex)) {
            setOptionVisible(pre =>
              pre.filter(item => item !== workoutContainerIndex),
            );
            console.log(optionVisible);
          } else {
            setOptionVisible(pre => [...pre, workoutContainerIndex]);
          }
        }}
        style={{padding: 10}}>
        <Text style={[styles.workoutTitle, {color: themeColors.textColor}]}>
          {item.workoutName} {item.entries.length}세트
        </Text>
      </TouchableOpacity>
      {optionVisible.includes(workoutContainerIndex) ? (
        <View
          style={{
            width: '100%',
          }}>
          <View>
            <FlatList
              data={item.entries}
              renderItem={({item, index}) => (
                <View style={[styles.workoutEntryBox]}>
                  <Text style={{color: themeColors.textColor}}>
                    {index + 1}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      value={`${item.weight}`}
                      onChangeText={text => handleWeightChange(text, index)}
                      keyboardType="numeric"
                      maxLength={5}
                      style={{
                        color: themeColors.textColor,
                        backgroundColor: '#443C68',
                        padding: 5,
                        borderRadius: 3,
                        fontSize: 15,
                        height: 30,
                      }}
                    />
                    <Text style={{color: themeColors.textColor, marginLeft: 5}}>
                      kg
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      value={`${item.reps}`}
                      onChangeText={text => handleRepsChange(text, index)}
                      keyboardType="numeric"
                      maxLength={5}
                      style={{
                        color: themeColors.textColor,
                        backgroundColor: '#443C68',
                        padding: 5,
                        borderRadius: 3,
                        fontSize: 15,
                        height: 30,
                      }}
                    />
                    <Text style={{color: themeColors.textColor, marginLeft: 5}}>
                      회
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => {}}>
                    <Text>{item.isWarmUp === true ? '워밍업' : '일반'}</Text>
                  </TouchableOpacity>
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
              style={[styles.editBottomButton]}>
              <AntDesign name="minus" color={themeColors.textColor} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressPlus()}
              style={[styles.editBottomButton]}>
              <AntDesign name="plus" color={themeColors.textColor} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={[styles.editBottomButton, {width: 60}]}>
              <Text style={{color: themeColors.textColor, fontWeight: '600'}}>
                순서 변경
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

function AddPlanScreen({navigation: {setOptions, goBack}, route: {params}}) {
  const [workouts, setWorkouts] = useState([]);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState([]);

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
  workoutContainer: {marginBottom: 5},
  workoutTitle: {fontSize: 20},
  workoutEntryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'grey',
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 4,
    marginHorizontal: 10,
    borderRadius: 5,
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
  editBottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editBottomButton: {
    height: 40,
    width: 120,
    borderRadius: 5,
    marginHorizontal: 3,
    marginVertical: 8,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
