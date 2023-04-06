import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';

//icons
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {themeColorsContext} from '../contexts';
import {TextInput} from 'react-native-gesture-handler';

const WorkoutEditModal = ({
  modalVisible,
  setModalVisible,
  workouts,
  setWorkouts,
  index,
}) => {
  const themeColors = useContext(themeColorsContext);

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
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Ionicons
                  name="close"
                  size={40}
                  color={themeColors.textColor}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text>{workouts[index].workoutName}</Text>
          <TextInput value="" />
        </View>
      </View>
    </Modal>
  );
};

export default WorkoutEditModal;

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
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 3,
  },
});
