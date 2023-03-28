import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function StartModal() {
  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.modal,
          {
            backgroundColor: 'grey',
          },
        ]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modal: {
    width: '100%',
    height: 400,
    borderRadius: 20,
    bottom: -20,
    paddingBottom: 20,
  },
});
