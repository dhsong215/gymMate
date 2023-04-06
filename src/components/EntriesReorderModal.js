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
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import FontAwsome from 'react-native-vector-icons/FontAwesome';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeColorsContext} from '../contexts';

const EntriesReorderModal = ({
  modalVisible,
  setModalVisible,
  entries,
  setEntries,
  setRefreshing,
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
                setEntries(pre =>
                  pre.filter((_, index) => index !== getIndex()),
                );
              }}>
              <FontAwsome
                name="trash-o"
                size={22}
                color={themeColors.textColor}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {color: themeColors.textColor}]}>
              {`${getIndex() + 1}. `}
            </Text>
            {item.weight >= 0 ? (
              <Text style={[styles.text, {color: themeColors.textColor}]}>
                {`${item.weight}${1 ? 'kg' : 'lbs'}`}
                {'  '}
              </Text>
            ) : null}
            {item.speed >= 0 ? (
              <Text style={[styles.text, {color: themeColors.textColor}]}>
                {item.speed}km/h{'  '}
              </Text>
            ) : null}
            {item.distance >= 0 ? (
              <Text style={[styles.text, {color: themeColors.textColor}]}>
                {item.distance}km{'  '}
              </Text>
            ) : null}
            {item.reps >= 0 ? (
              <Text style={[styles.text, {color: themeColors.textColor}]}>
                {item.reps}회{'  '}
              </Text>
            ) : null}
            {item.time >= 0 ? (
              <Text style={[styles.text, {color: themeColors.textColor}]}>
                {item.time}분{'  '}
              </Text>
            ) : null}
          </View>
          <Pressable onLongPress={drag}>
            <FontAwsome
              name="reorder"
              size={22}
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
                onPress={() => {
                  setRefreshing(false);
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

          <GestureHandlerRootView style={{flex: 1}}>
            <DraggableFlatList
              containerStyle={{flex: 1, paddingVertical: 3}}
              data={entries}
              onDragEnd={({data}) => {
                setEntries(data);
              }}
              keyExtractor={(_, index) => `entries_reorder_${index}`}
              renderItem={renderItem}
            />
          </GestureHandlerRootView>
        </View>
      </View>
    </Modal>
  );
};

export default EntriesReorderModal;

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
