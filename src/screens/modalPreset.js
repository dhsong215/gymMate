import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Pressable} from 'react-native';
import {ThemeColorsContext} from '../contexts';

export default function StartModal({navigation: {goBack}}) {
  const themeColors = useContext(ThemeColorsContext);
  const modalPositionY = useRef(new Animated.Value(0)).current;

  const startUp = Animated.spring(modalPositionY, {
    toValue: -400,
    tension: 70,
    useNativeDriver: true,
  });

  const hideModal = Animated.timing(modalPositionY, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });

  useEffect(() => {
    startUp.start();
  }, []);

  const opacity = modalPositionY.interpolate({
    inputRange: [-400, 0],
    outputRange: [0.5, 0],
  });

  return (
    <>
      {/* backdrop */}
      <Animated.View
        style={[styles.mainContainer, {backgroundColor: 'black', opacity}]}>
        <Pressable
          style={{flex: 1}}
          onPress={() => {
            hideModal.start(() => goBack());
          }}></Pressable>
      </Animated.View>

      {/* modal screen */}
      <Animated.View
        style={[
          styles.modal,
          {
            backgroundColor: themeColors.modalColors[0],
            transform: [{translateY: modalPositionY}],
          },
        ]}></Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  //보여지는 높이 : 300
  modal: {
    position: 'absolute',
    width: '100%',
    height: 400,
    borderRadius: 20,
    bottom: -520,
    paddingBottom: 120,
  },
});
