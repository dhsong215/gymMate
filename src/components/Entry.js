import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

//context
import {ThemeColorsContext} from '../contexts';

//logics
import {
  handleWeightChange,
  handleDistanceChange,
  handleSpeedChange,
  handleRepsChange,
  handleTimeChange,
} from '../logic/entries';

//component
import SetEditModal from './modals/SetEditModal';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Entry = ({index, item, refreshing, setChangedEntry, setTimerOn}) => {
  const themeColors = useContext(ThemeColorsContext);

  const [weightValue, setWeightValue] = useState(item.weight);
  const [repsValue, setRepsValue] = useState(item.reps);
  const [timeValue, setTimeValue] = useState(item.time);
  const [distanceValue, setDistanceValue] = useState(item.distance);
  const [speedValue, setSpeedValue] = useState(item.speed);
  const [entrySetValue, setEntrySetValue] = useState(item.set);
  const [setEditModalVisible, setSetEditModalVisible] = useState(false);

  useEffect(() => {
    setWeightValue(item.weight);
    setRepsValue(item.reps);
    setTimeValue(item.time);
    setDistanceValue(item.distance);
    setSpeedValue(item.speed);
  }, [refreshing]);

  useEffect(() => {
    const changedEntry = {...item, set: entrySetValue};
    setChangedEntry({index, entry: changedEntry});
  }, [entrySetValue]);

  return (
    <View
      style={[
        styles.workoutEntryBox,
        {backgroundColor: themeColors.boxColors[1]},
      ]}>
      <View
        style={{
          width: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: themeColors.textColor, width: 30}}>
          {index + 1}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setSetEditModalVisible(true);
          }}>
          <Text
            style={{
              color: themeColors.textColor,
              width: 40,
              textAlign: 'center',
            }}>
            {item.set === 'warming_up'
              ? '워밍업'
              : item.set === 'drop'
              ? '드롭'
              : item.set === 'fail'
              ? '실패'
              : '일반'}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        {item.weight >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${weightValue === 0 ? '' : weightValue}`}
              onChangeText={text => {
                const changedEntry = handleWeightChange(
                  item,
                  text,
                  setWeightValue,
                );
                setChangedEntry({index, entry: changedEntry});
              }}
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

        {item.speed >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${speedValue === 0 ? '' : speedValue}`}
              placeholder={'0'}
              onChangeText={text => {
                const changedEntry = handleSpeedChange(
                  item,
                  text,
                  setSpeedValue,
                );
                setChangedEntry({index, entry: changedEntry});
              }}
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

        {item.distance >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${distanceValue === 0 ? '' : distanceValue}`}
              placeholder={'0'}
              onChangeText={text => {
                const changedEntry = handleDistanceChange(
                  item,
                  text,
                  setDistanceValue,
                );
                setChangedEntry({index, entry: changedEntry});
              }}
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

        {item.reps >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${repsValue === 0 ? '' : repsValue}`}
              placeholder={'0'}
              onChangeText={text => {
                const changedEntry = handleRepsChange(item, text, setRepsValue);
                setChangedEntry({index, entry: changedEntry});
              }}
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

        {item.time >= 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={`${timeValue === 0 ? '' : timeValue}`}
              placeholder={'0'}
              onChangeText={text => {
                const changedEntry = handleTimeChange(item, text, setTimeValue);
                setChangedEntry({index, entry: changedEntry});
              }}
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
      </View>

      <TouchableOpacity
        onPress={() => {
          const changedEntry = {...item, isDone: !item.isDone};
          setChangedEntry({index, entry: changedEntry});
          if (setTimerOn) {
            if (item.isDone === false) {
              setTimerOn(true);
            }
          }
        }}
        style={{
          marginLeft: 10,
          width: 40,
          height: 35,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        {item.isDone ? (
          <MaterialIcons
            name="check-circle"
            size={25}
            color={themeColors.buttonColors[7]}
          />
        ) : (
          <MaterialIcons
            style={{opacity: 0.5}}
            name="check-circle-outline"
            size={25}
            color={themeColors.buttonColors[6]}
          />
        )}
      </TouchableOpacity>

      <SetEditModal
        modalVisible={setEditModalVisible}
        setModalVisible={setSetEditModalVisible}
        setEntrySetValue={setEntrySetValue}
      />
    </View>
  );
};

export default React.memo(Entry);

const styles = StyleSheet.create({
  workoutEntryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  entryInput: {
    padding: 5,
    borderRadius: 3,
    fontSize: 15,
    height: 35,
    width: 50,
    textAlign: 'center',
  },
});
