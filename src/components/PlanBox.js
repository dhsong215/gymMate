import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//context
import {ThemeColorsContext} from '../contexts';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function PlanBox({
  plan,
  isEditMode,
  setCheckedPlans,
  checkedPlans,
  id,
}) {
  const themeColors = useContext(ThemeColorsContext);

  const navigation = useNavigation();

  const doPlanAlert = () =>
    Alert.alert('운동을 수행하시겠습니까?', plan.title, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.goBack();
          navigation.navigate('Working');
        },
      },
    ]);

  return (
    <View
      style={[styles.container, {backgroundColor: themeColors.boxColors[0]}]}>
      {isEditMode ? (
        <TouchableOpacity
          onPress={() => {
            setCheckedPlans(pre => {
              if (pre.find(item => item === id)) {
                return pre.filter(item => item !== id);
              } else {
                return [...pre, id];
              }
            });
          }}
          style={{marginRight: 10}}>
          <MaterialIcons
            name={
              checkedPlans.find(item => item === id)
                ? 'check-box'
                : 'check-box-outline-blank'
            }
            size={25}
            color={themeColors.textColor}
          />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.plan} onPress={doPlanAlert}>
        <Text style={[styles.planTitle, {color: themeColors.textColor}]}>
          {plan.title}
        </Text>
        {plan.workouts.map(workout => (
          <View key={workout.workoutId}>
            <Text style={[{color: themeColors.textColor, opacity: 0.8}]}>
              {workout.workoutName} {workout.entries.length}세트
            </Text>
          </View>
        ))}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plan: {width: '100%'},
  planTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },
});
