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
  handleIsWarmUpChange,
} from '../logic/entries';

const Entry = ({index, item, entries, setEntries, refreshing}) => {
  const themeColors = useContext(ThemeColorsContext);

  const [weightValue, setWeightValue] = useState(item.weight);
  const [repsValue, setRepsValue] = useState(item.reps);
  const [timeValue, setTimeValue] = useState(item.time);
  const [distanceValue, setDistanceValue] = useState(item.distance);
  const [speedValue, setSpeedValue] = useState(item.speed);

  useEffect(() => {
    setWeightValue(item.weight);
    setRepsValue(item.reps);
    setTimeValue(item.time);
    setDistanceValue(item.distance);
    setSpeedValue(item.speed);
  }, [refreshing]);

  return (
    <View
      style={[
        styles.workoutEntryBox,
        {backgroundColor: themeColors.boxColors[1]},
      ]}>
      <Text style={{color: themeColors.textColor, width: 30}}>{index + 1}</Text>
      {item.weight >= 0 ? (
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
          <Text style={{color: themeColors.textColor, marginLeft: 5}}>kg</Text>
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
            onChangeText={text =>
              handleSpeedChange(entries, setEntries, text, index, setSpeedValue)
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

      {item.distance >= 0 ? (
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
          <Text style={{color: themeColors.textColor, marginLeft: 5}}>km</Text>
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
          <Text style={{color: themeColors.textColor, marginLeft: 5}}>회</Text>
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
          <Text style={{color: themeColors.textColor, marginLeft: 5}}>분</Text>
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
};

export default React.memo(Entry);

const styles = StyleSheet.create({
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
  entryInput: {
    padding: 5,
    borderRadius: 3,
    fontSize: 15,
    height: 30,
    width: 50,
    textAlign: 'center',
  },
});
