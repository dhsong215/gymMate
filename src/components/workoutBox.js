import React, {useState, useCallback, useContext, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
  TextInput,
} from 'react-native';

//context
import {themeColorsContext} from '../contexts';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//components
import {addEntry} from '../logic/entries';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Entry = React.memo(
  ({index, item, handleWeightChange, handleRepsChange, themeColors}) => {
    const [weightValue, setWeightValue] = useState('');

    return (
      <View style={[styles.workoutEntryBox]}>
        <Text style={{color: themeColors.textColor, width: 30}}>
          {index + 1}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            value={`${weightValue === 0 ? '' : weightValue}`}
            onChangeText={text =>
              handleWeightChange(text, index, setWeightValue)
            }
            keyboardType="numeric"
            maxLength={6}
            placeholder={'0'}
            style={{
              color: themeColors.textColor,
              backgroundColor: '#443C68',
              padding: 5,
              borderRadius: 3,
              fontSize: 15,
              height: 30,
              width: 70,
              textAlign: 'center',
            }}
          />
          <Text style={{color: themeColors.textColor, marginLeft: 5}}>kg</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            value={`${item.reps === 0 ? '' : item.reps}`}
            placeholder={'0'}
            onChangeText={text => handleRepsChange(text, index)}
            keyboardType="numeric"
            maxLength={4}
            style={{
              color: themeColors.textColor,
              backgroundColor: '#443C68',
              padding: 5,
              borderRadius: 3,
              fontSize: 15,
              height: 30,
              width: 50,
              textAlign: 'center',
            }}
          />
          <Text style={{color: themeColors.textColor, marginLeft: 5}}>회</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text>{item.isWarmUp === true ? '워밍업' : '일반'}</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

const WorkoutBox = ({
  item,
  workoutContainerIndex,
  //contexts
  optionVisible,
  setOptionVisible,
  workouts,
  setWorkouts,
  flatListRef, //scroll
  scrollY,
}) => {
  const themeColors = useContext(themeColorsContext);

  const onPressPlus = useCallback(() => {
    const targetWorkout = {...workouts[workoutContainerIndex]};
    const updatedWorkout = addEntry(targetWorkout);
    const updatedWorkouts = [
      ...workouts.slice(0, workoutContainerIndex),
      updatedWorkout,
      ...workouts.slice(workoutContainerIndex + 1),
    ];

    setWorkouts(updatedWorkouts);

    flatListRef.current.scrollToOffset({
      offset: Math.max(0, scrollY + 50),
      animated: false,
    });
  }, [scrollY, workouts]);

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

    flatListRef.current.scrollToOffset({
      offset: Math.max(0, scrollY - 50),
      animated: false,
    });
  };

  const handleWeightChange = useCallback(
    (text, index, setWeightValue) => {
      let filteredText = text.replace(/[^0-9.]/g, ''); // 텍스트에 문자가 있으면 해당 문자를 공백으로 변환합니다.
      if (filteredText.endsWith('.')) {
        setWeightValue(filteredText);
        filteredText = filteredText.slice(0, -1);
      } else {
        setWeightValue(filteredText);
      }
      const finalText = filteredText === '' ? '0' : filteredText; // 최종 문자가 공백이면 entry에 값이 0으로 저장되도록 합니다.
      const targetWorkout = {...workouts[workoutContainerIndex]}; // 수정될 entry가 있는 workout을 복제해 옵니다.

      // 현재 수정한 entry의 인덱스 값과 일치하는 targetWorkout의 entry를 수정한 값으로 바꾸고 entry배열을 updeatedEntries에 저장합니ㅏㄷ.
      const updatedEntries = targetWorkout.entries.map((entry, entryIndex) => {
        if (entryIndex === index) {
          return {...entry, weight: parseFloat(finalText)};
        } else {
          return entry;
        }
      });
      console.log(parseFloat(finalText));

      //변경된 entry값이 반영된 새로운 workout객체
      const updatedWorkout = {...targetWorkout, entries: updatedEntries};

      //변경된 workout(updatedWorkout)값으로 기존 targetWorkout의 원 값 바꿔치기
      const updatedWorkouts = [
        ...workouts.slice(0, workoutContainerIndex),
        updatedWorkout,
        ...workouts.slice(workoutContainerIndex + 1),
      ];
      setWorkouts(updatedWorkouts);
    },
    [workouts, workoutContainerIndex],
  );

  const handleRepsChange = useCallback(
    (text, index) => {
      const filteredText = text.replace(/[^0-9.]/g, '');
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
    },
    [workouts, workoutContainerIndex],
  );

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
                <Entry
                  index={index}
                  item={item}
                  handleWeightChange={handleWeightChange}
                  handleRepsChange={handleRepsChange}
                  themeColors={themeColors}
                />
              )}
              keyExtractor={(item, index) =>
                `workout${workoutContainerIndex}${index}`
              }
            />
          </View>

          {/* 엔트리 더하기 빼기 순서변경 버튼이 있습니다 */}
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
    backgroundColor: 'grey',
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
