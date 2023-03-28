import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function RoutineScreen() {
  return (
    <View style={styles.mainContainer}>
      <Text>hello world</Text>
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
