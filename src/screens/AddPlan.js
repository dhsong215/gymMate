import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  ScaleDecorator,
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';
import {gestureHandlerRootHOC, ScrollView} from 'react-native-gesture-handler';

//context
import {themeColorsContext} from '../contexts';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//components
import AddExerciseModal from '../components/addExerciseModal';

const Header = ({goBack, title}) => {
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

const renderItem = ({
  item,
  drag,
  isActive,
  getIndex,
  optionVisible,
  setOptionVisible,
  workouts,
  setWorkouts,
}) => {
  const themeColors = useContext(themeColorsContext);

  const onPressPlus = () => {
    const data = workouts.map((a, index) => {
      if (index === getIndex()) {
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
      if (index === getIndex()) {
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
    <ScaleDecorator>
      <TouchableOpacity
        onPress={() => {
          setOptionVisible(getIndex());
        }}
        onLongPress={drag}
        disabled={isActive}
        style={[
          styles.workoutContainer,
          {
            backgroundColor: isActive ? 'lightgrey' : themeColors.boxColors[0],
          },
        ]}>
        <View>
          <Text style={[styles.workoutTitle, {color: themeColors.textColor}]}>
            {item.workoutName}
          </Text>
          <View
            style={{
              width: '100%',
              display: getIndex() === optionVisible ? 'flex' : 'none',
            }}>
            {item.entries.map(entries => {
              if (item.type === 'strength') {
                //개수 무게
              }
            })}
            <View style={{backgroundColor: 'white'}}>
              {item.entries.map((arr, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{arr.weight}</Text>
                    <Text>{arr.reps}</Text>
                  </View>
                );
              })}
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
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

function AddPlanScreen({navigation: {setOptions, goBack}, route: {params}}) {
  const [workouts, setWorkouts] = useState([]);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState();

  const themeColors = useContext(themeColorsContext);

  useEffect(() => {
    setOptions({header: () => <Header goBack={goBack} title={params.date} />});
  }, []);

  const GestureHandlerRootView = gestureHandlerRootHOC(() => (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      {/* workout list */}
      <NestableScrollContainer>
        <View style={{height: 30}}></View>
        <NestableDraggableFlatList
          scrollEnabled={false}
          data={workouts}
          onDragEnd={({data}) => setWorkouts(data)}
          keyExtractor={(item, index) => {
            return 'workout' + `${index}`;
          }}
          renderItem={({item, isActive, drag, getIndex}) =>
            renderItem({
              item,
              isActive,
              getIndex,
              drag,
              setOptionVisible,
              optionVisible,
              setWorkouts,
              workouts,
            })
          }
        />
      </NestableScrollContainer>

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
  ));

  return <GestureHandlerRootView />;
}

export default AddPlanScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 130,
  },
  headerTopContainer: {flexDirection: 'row', padding: 10, alignItems: 'center'},
  headerBackButton: {marginRight: 20},
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
  workoutTitle: {},
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
    height: 30,
    width: 30,
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: 'grey',
  },
});
