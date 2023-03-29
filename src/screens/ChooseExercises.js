import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {themeColorsContext} from '../contexts';

export default function ChooseExercisesScreen() {
  const themeColors = useContext(themeColorsContext);
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      <Text style={{color: themeColors.textColor}}>Hello, world.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
