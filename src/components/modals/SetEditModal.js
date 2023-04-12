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

const SetEditModal = ({modalVisible, setModalVisible}) => {
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
              setModalVisible(false);
            }}
            style={styles.button}>
            <View style={[styles.buttonView, {backgroundColor: 'grey'}]}>
              <Text>일반</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.button}>
            <View style={[styles.buttonView, {backgroundColor: 'grey'}]}>
              <Text>워밍업</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.button}>
            <View style={[styles.buttonView, {backgroundColor: 'grey'}]}>
              <Text>드롭</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.button}>
            <View style={[styles.buttonView, {backgroundColor: 'grey'}]}>
              <Text>실패</Text>
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
});
