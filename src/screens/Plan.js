import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {themeColorsContext} from '../contexts';

import CalendarComponent from '../components/calendar';

export default function PlanScreen() {
  const themeColors = useContext(themeColorsContext);

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={{width: '100%'}}>
        <CalendarComponent />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
});
