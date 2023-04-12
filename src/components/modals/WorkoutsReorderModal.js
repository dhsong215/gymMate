import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';

import FontAwsome from 'react-native-vector-icons/FontAwesome';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeColorsContext} from '../../contexts';

const WorkoutsReorderModal = ({
  modalVisible,
  setModalVisible,
  workouts,
  setWorkouts,
  planTitle,
  setPlanTitle,
}) => {
  const themeColors = useContext(ThemeColorsContext);

  const renderItem = ({item, drag, isActive, getIndex}) => {
    return (
      <ScaleDecorator>
        <View
          disabled={isActive}
          style={[styles.rowItem, {backgroundColor: themeColors.boxColors[0]}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => {
                setWorkouts(pre =>
                  pre.filter((_, index) => index !== getIndex()),
                );
              }}>
              <FontAwsome
                name="trash-o"
                size={25}
                color={themeColors.textColor}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {color: themeColors.textColor}]}>
              {item.workoutName}
            </Text>
          </View>
          <Pressable onLongPress={drag}>
            <FontAwsome
              name="reorder"
              size={25}
              color={themeColors.textColor}
            />
          </Pressable>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[styles.modal, {backgroundColor: themeColors.modalColors[0]}]}>
          {/* modal header */}
          <View
            style={[
              styles.modalHeader,
              {backgroundColor: themeColors.screenHeaderColors[1]},
            ]}>
            {/* top of header */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{opacity: 0.6}}
                onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={40}
                  color={themeColors.textColor}
                />
              </TouchableOpacity>
            </View>

            {/* 플랜 이름 변경 */}
            <TextInput
              value={planTitle}
              onChangeText={text => setPlanTitle(text)}
              maxLength={15}
              style={{
                color: themeColors.textColor,
                backgroundColor: themeColors.boxColors[0],
                marginBottom: 10,
                padding: 10,
                borderRadius: 10,
                textAlign: 'center',
              }}
            />
          </View>
          <GestureHandlerRootView style={{flex: 1}}>
            <DraggableFlatList
              containerStyle={{flex: 1, paddingVertical: 3}}
              data={workouts}
              onDragEnd={({data}) => setWorkouts(data)}
              keyExtractor={(_, index) => `workout_reorder_${index}`}
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
      </View>
    </Modal>
  );
};

export default WorkoutsReorderModal;

const styles = StyleSheet.create({
  modal: {
    width: '90%',
    height: '60%',
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalHeader: {
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 5,
  },
  rowItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 3,
  },
});
