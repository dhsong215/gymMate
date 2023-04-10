import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

//context
import {ThemeColorsContext} from '../contexts';

export default function PlanBox({plan}) {
  const themeColors = useContext(ThemeColorsContext);
  console.log(plan.workouts);
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: themeColors.boxColors[0]}]}>
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
  );
}

const styles = StyleSheet.create({
  container: {width: '100%', padding: 10, marginBottom: 10},
  planTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },
});
