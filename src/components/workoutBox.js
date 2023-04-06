import React, {useState, useCallback, useContext, useEffect, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

//context
import {ThemeColorsContext} from '../contexts';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//components
import EntriesReorderModal from './EntriesReorderModal';
import WorkoutEditModal from './WorkoutEditModal';

//logics
import {
  addEntry,
  handleWeightChange,
  handleDistanceChange,
  handleSpeedChange,
  handleRepsChange,
  handleTimeChange,
  handleIsWarmUpChange,
} from '../logic/entries';

const Entry = React.memo(
  ({index, item, themeColors, entries, setEntries, refreshing}) => {
    const [weightValue, setWeightValue] = useState(entries[index].weight);
    const [repsValue, setRepsValue] = useState(entries[index].reps);
    const [timeValue, setTimeValue] = useState(entries[index].time);
    const [distanceValue, setDistanceValue] = useState(entries[index].distance);
    const [speedValue, setSpeedValue] = useState(entries[index].speed);

    useEffect(() => {
      setWeightValue(entries[index].weight);
      setRepsValue(entries[index].reps);
      setTimeValue(entries[index].time);
      setDistanceValue(entries[index].distance);
      setSpeedValue(entries[index].speed);
    }, [refreshing]);

    return (
      <View
        style={[
          styles.workoutEntryBox,
          {backgroundColor: themeColors.boxColors[1]},
        ]}>
        <Text style={{color: themeColors.textColor, width: 30}}>
          {index + 1}
        </Text>
        {entries[index].weight >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${weightValue === 0 ? '' : weightValue}`}
              onChangeText={text =>
                handleWeightChange(
                  entries,
                  setEntries,
                  text,
                  index,
                  setWeightValue,
                )
              }
              keyboardType="numeric"
              maxLength={6}
              placeholder={'0'}
              style={[
                styles.entryInput,
                {
                  color: themeColors.textColor,
                  width: 70,
                  backgroundColor: themeColors.boxColors[0],
                },
              ]}
            />
            <Text style={{color: themeColors.textColor, marginLeft: 5}}>
              kg
            </Text>
          </View>
        ) : null}

        {entries[index].speed >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${speedValue === 0 ? '' : speedValue}`}
              placeholder={'0'}
              onChangeText={text =>
                handleSpeedChange(
                  entries,
                  setEntries,
                  text,
                  index,
                  setSpeedValue,
                )
              }
              keyboardType="numeric"
              maxLength={6}
              style={[
                styles.entryInput,
                {
                  color: themeColors.textColor,
                  width: 70,
                  backgroundColor: themeColors.boxColors[0],
                },
              ]}
            />
            <Text style={{color: themeColors.textColor, marginLeft: 5}}>
              km/h
            </Text>
          </View>
        ) : null}

        {entries[index].distance >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${distanceValue === 0 ? '' : distanceValue}`}
              placeholder={'0'}
              onChangeText={text =>
                handleDistanceChange(
                  entries,
                  setEntries,
                  text,
                  index,
                  setDistanceValue,
                )
              }
              keyboardType="numeric"
              maxLength={6}
              style={[
                styles.entryInput,
                {
                  color: themeColors.textColor,
                  width: 70,
                  backgroundColor: themeColors.boxColors[0],
                },
              ]}
            />
            <Text style={{color: themeColors.textColor, marginLeft: 5}}>
              km
            </Text>
          </View>
        ) : null}

        {entries[index].reps >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${repsValue === 0 ? '' : repsValue}`}
              placeholder={'0'}
              onChangeText={text =>
                handleRepsChange(entries, setEntries, text, index, setRepsValue)
              }
              keyboardType="numeric"
              maxLength={4}
              style={[
                styles.entryInput,
                {
                  color: themeColors.textColor,
                  backgroundColor: themeColors.boxColors[0],
                },
              ]}
            />
            <Text style={{color: themeColors.textColor, marginLeft: 5}}>
              회
            </Text>
          </View>
        ) : null}

        {entries[index].time >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${timeValue === 0 ? '' : timeValue}`}
              placeholder={'0'}
              onChangeText={text =>
                handleTimeChange(entries, setEntries, text, index, setTimeValue)
              }
              keyboardType="numeric"
              maxLength={4}
              style={[
                styles.entryInput,
                {
                  color: themeColors.textColor,
                  backgroundColor: themeColors.boxColors[0],
                },
              ]}
            />
            <Text style={{color: themeColors.textColor, marginLeft: 5}}>
              분
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            handleIsWarmUpChange(entries, setEntries, index);
          }}>
          <Text
            style={{
              color: themeColors.textColor,
              width: 40,
              textAlign: 'center',
            }}>
            {item.isWarmUp === true ? '워밍업' : '일반'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

const WorkoutBox = ({
  workout,
  workoutContainerIndex,
  //contexts
  optionVisible,
  setOptionVisible,
  workouts,
  setWorkouts,
  flatListRef, //scroll
}) => {
  const [entries, setEntries] = useState([]); //handler에 보내야됨
  const [entriesReorderModalVisible, setEntriesReorderModalVisible] =
    useState(false);
  const [workoutData, setWorkoutData] = useState(workout);
  const [WorkoutEditModalVisible, setWorkoutEditModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const themeColors = useContext(ThemeColorsContext);

  useEffect(() => {
    const setNewWorkouts = () => {
      const updatedData = workouts.map(item => {
        if (item.workoutId === workoutData.workoutId) {
          return {...workoutData};
        }
        return item;
      });
      setWorkouts(updatedData);
    };
    setNewWorkouts();
  }, [workoutData]);

  useEffect(() => {
    setWorkoutData(pre => ({...pre, entries: entries}));
  }, [entries]);

  const onPressPlus = () => {
    const workoutType = workout.type;
    const newEntries = addEntry(entries, workoutType);

    setEntries(newEntries);
    if (workoutContainerIndex === workouts.length - 1) {
      flatListRef.current.scrollToEnd({animated: false});
    }
  };

  const onPressMinus = () => {
    setEntries(pre => pre.slice(0, -1));
  };

  const onPressReorder = () => {
    setEntriesReorderModalVisible(true);
  };

  return (
    <View
      style={[
        styles.workoutContainer,
        {backgroundColor: themeColors.boxColors[0]},
      ]}>
      <TouchableOpacity
        onPress={() => {
          if (optionVisible.includes(workout.workoutId)) {
            setOptionVisible(pre =>
              pre.filter(item => item !== workout.workoutId),
            );
          } else {
            setOptionVisible(pre => [...pre, workout.workoutId]);
          }
        }}
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.workoutTitle, {color: themeColors.textColor}]}>
          {workout.workoutName} {entries.length}세트
        </Text>
        {/* workout modal 띄우는 버튼 */}
        <TouchableOpacity
          onPress={() => {
            setWorkoutEditModalVisible(true);
          }}>
          <AntDesign name="edit" size={25} color={themeColors.textColor} />
        </TouchableOpacity>
      </TouchableOpacity>
      {optionVisible.includes(workout.workoutId) ? (
        <View
          style={{
            width: '100%',
          }}>
          <View>
            <FlatList
              data={entries}
              renderItem={({item, index}) => (
                <Entry
                  item={item}
                  index={index}
                  themeColors={themeColors}
                  entries={entries}
                  setEntries={setEntries}
                  refreshing={refreshing}
                />
              )}
              keyExtractor={(_, index) => `entry${workout.workoutId}${index}`}
              refreshing={refreshing}
            />
          </View>

          {/* 엔트리 더하기 빼기 순서변경 버튼이 있습니다 */}
          <View style={[styles.bottomEditButtonContainer]}>
            {/* 엔트리를 하나 뺍니다 */}
            <TouchableOpacity
              onPress={() => onPressMinus()}
              style={[
                styles.bottomEditButton,
                {backgroundColor: themeColors.buttonColors[1]},
              ]}>
              <AntDesign name="minus" color={themeColors.textColor} size={30} />
            </TouchableOpacity>

            {/* 엔트리 하나 더합니다 */}
            <TouchableOpacity
              onPress={() => onPressPlus()}
              style={[
                styles.bottomEditButton,
                {backgroundColor: themeColors.buttonColors[1]},
              ]}>
              <AntDesign name="plus" color={themeColors.textColor} size={30} />
            </TouchableOpacity>

            {/* 엔트리 순서를 수정*/}
            <TouchableOpacity
              onPress={() => {
                setRefreshing(true);
                onPressReorder();
              }}
              style={[
                styles.bottomEditButton,
                {width: 60, backgroundColor: themeColors.buttonColors[1]},
              ]}>
              <Text style={{color: themeColors.textColor, fontWeight: '600'}}>
                순서 변경
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <EntriesReorderModal
        modalVisible={entriesReorderModalVisible}
        setModalVisible={setEntriesReorderModalVisible}
        entries={entries}
        setEntries={setEntries}
        setRefreshing={setRefreshing}
      />
      <WorkoutEditModal
        modalVisible={WorkoutEditModalVisible}
        setModalVisible={setWorkoutEditModalVisible}
        workoutData={workoutData}
        setWorkoutData={setWorkoutData}
      />
    </View>
  );
};

export default React.memo(WorkoutBox);

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
    marginVertical: 3,
    paddingHorizontal: 10,
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
  bottomEditButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomEditButton: {
    height: 40,
    width: 120,
    borderRadius: 5,
    marginHorizontal: 3,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryInput: {
    padding: 5,
    borderRadius: 3,
    fontSize: 15,
    height: 30,
    width: 50,
    textAlign: 'center',
  },
});
