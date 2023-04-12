import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';

import {ThemeColorsContext} from '../../contexts';

const SetEditModal = ({modalVisible, setModalVisible, setEntrySetValue}) => {
  const themeColors = useContext(ThemeColorsContext);

  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={() => setModalVisible(false)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[styles.modal, {backgroundColor: themeColors.modalColors[0]}]}>
          <TouchableOpacity
            onPress={() => {
              setEntrySetValue('normal');
              setModalVisible(false);
            }}
            style={styles.button}>
            <View
              style={[
                styles.buttonView,
                {backgroundColor: themeColors.buttonColors[1]},
              ]}>
              <Text style={styles.buttonText}>일반</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEntrySetValue('warming_up');
              setModalVisible(false);
            }}
            style={styles.button}>
            <View
              style={[
                styles.buttonView,
                {backgroundColor: themeColors.buttonColors[2]},
              ]}>
              <Text style={styles.buttonText}>워밍업</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEntrySetValue('drop');
              setModalVisible(false);
            }}
            style={styles.button}>
            <View
              style={[
                styles.buttonView,
                {backgroundColor: themeColors.buttonColors[2]},
              ]}>
              <Text style={styles.buttonText}>드롭</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEntrySetValue('fail');
              setModalVisible(false);
            }}
            style={styles.button}>
            <View
              style={[
                styles.buttonView,
                {backgroundColor: themeColors.buttonColors[3]},
              ]}>
              <Text style={styles.buttonText}>실패</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SetEditModal;

const styles = StyleSheet.create({
  modal: {
    width: 320,
    height: 100,
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  button: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
});
