import React, {useState, useCallback, useContext, useEffect, memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

//context
import {ThemeColorsContext} from '../contexts';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//components
import EntriesReorderModal from './EntriesReorderModal';
import WorkoutEditModal from './WorkoutEditModal';
import Entry from './Entry';

//logics
import {addEntry} from '../logic/entries';

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
  const [entries, setEntries] = useState([...workout.entries]); //handler에 보내야됨
  const [entriesReorderModalVisible, setEntriesReorderModalVisible] =
    useState(false);
  const [workoutData, setWorkoutData] = useState(workout);
  const [WorkoutEditModalVisible, setWorkoutEditModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const themeColors = useContext(ThemeColorsContext);

  //workoutData바뀌면 실행
  useEffect(() => {
    const updatedData = workouts.map(item => {
      if (item.workoutId === workoutData.workoutId) {
        return {...workoutData};
      }
      return item;
    });
    setWorkouts(updatedData);
  }, [workoutData]);

  //entry변경되면 실행
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
  headerTitle: {fontSize: 20, fontWeight: '600'},
  workoutContainer: {marginBottom: 5},
  workoutTitle: {fontSize: 20},
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
});
