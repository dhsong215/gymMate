import React, {useContext, useEffect, useState, memo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {ThemeColorsContext} from '../contexts';

//logic
import {addEntry} from '../logic/entries';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//components
import Entry from '../components/Entry';
import EntriesReorderModal from '../components/modals/EntriesReorderModal';
import WorkoutEditModal from './modals/WorkoutEditModal';

const WINDOW_WIDTH = Dimensions.get('window').width;

const WorkoutPage = ({workoutData, workoutIndex, setChangedWorkout}) => {
  const themeColors = useContext(ThemeColorsContext);

  const scrollViewRef = useRef();

  const [workout, setWorkout] = useState(workoutData);
  const [entries, setEntries] = useState([...workoutData.entries]);
  const [changedEntry, setChangedEntry] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [entriesReorderModalVisible, setEntriesReorderModalVisible] =
    useState(false);
  const [workoutEditModalVisible, setWorkoutEditModalVisible] = useState(false);
  const [plusPressed, setPlusPressed] = useState(false);

  if (workoutData.workoutId !== workout.workoutId) {
    setWorkout(workoutData);
    setEntries([...workoutData.entries]);
  }

  //workout바뀌면 실행
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

  const onContentSizeChange = () => {
    if (entries && entries.length > 0 && plusPressed) {
      scrollViewRef.current.scrollToEnd({animated: true});
      setPlusPressed(false);
    }
  };

  const onPressPlus = () => {
    const workoutType = workout.type;
    const newEntries = addEntry(entries, workoutType);

    setEntries(newEntries);
    setPlusPressed(true);
  };
  const onPressMinus = () => {
    setEntries(pre => pre.slice(0, -1));
  };

  const onPressReorder = () => {
    setEntriesReorderModalVisible(true);
  };

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
        }}></View>
      <FlatList
        ref={scrollViewRef}
        data={entries}
        keyExtractor={(_, index) => `${workout.workoutId}${index}`}
        onContentSizeChange={onContentSizeChange}
        initialScrollIndex={0}
        renderItem={({item, index}) => (
          <Entry
            index={index}
            item={item}
            refreshing={refreshing}
            setChangedEntry={setChangedEntry}
          />
        )}
        ListFooterComponent={() => (
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
        )}
      />

      <EntriesReorderModal
        modalVisible={entriesReorderModalVisible}
        setModalVisible={setEntriesReorderModalVisible}
        entries={entries}
        setEntries={setEntries}
        setRefreshing={setRefreshing}
      />
      <WorkoutEditModal
        modalVisible={workoutEditModalVisible}
        setModalVisible={setWorkoutEditModalVisible}
        workoutData={workout}
        setWorkout={setWorkout}
      />
    </View>
  );
};

export default React.memo(WorkoutPage);

const styles = StyleSheet.create({
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
