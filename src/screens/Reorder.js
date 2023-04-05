import React, {useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {themeColorsContext} from '../contexts';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default function ReorderModal({navigation: {goBack}, route: {params}}) {
  const themeColors = useContext(themeColorsContext);
  const modalPositionY = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  console.log(params);
  const startUp = Animated.spring(modalPositionY, {
    toValue: 200,
    useNativeDriver: true,
  });

  const hideModal = Animated.timing(modalPositionY, {
    toValue: WINDOW_HEIGHT,
    duration: 200,
    useNativeDriver: true,
  });

  useEffect(() => {
    startUp.start();
  }, []);

  const opacity = modalPositionY.interpolate({
    inputRange: [-400, 0],
    outputRange: [0.5, 0],
    extrapolate: 'clamp',
  });

  const renderItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            {backgroundColor: isActive ? 'red' : item.backgroundColor},
          ]}>
          <Text style={styles.text}>{item.workoutName}dasd</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

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
        ]}>
        {/* 200은 startUp의 toValue값 */}
        <View style={{height: WINDOW_HEIGHT - 200}}>
          <GestureHandlerRootView style={{flex: 1}}>
            <DraggableFlatList
              containerStyle={{flex: 1}}
              data={params.workouts}
              onDragEnd={({data}) => params.setWorkouts(data)}
              keyExtractor={(item, index) => `workout_reorder_${index}`}
              renderItem={({item, isActive, drag, getIndex}) =>
                renderItem({
                  item,
                  isActive,
                  getIndex,
                  drag,
                })
              }
            />
          </GestureHandlerRootView>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    position: 'absolute',
    width: '100%',
    height: WINDOW_HEIGHT,
    borderRadius: 20,
    bottom: 0,
  },
});
