import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ThemeColorsContext} from '../contexts';

export default function RoutineScreen() {
  const themeColors = useContext(ThemeColorsContext);
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}></View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
