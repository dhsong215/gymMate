import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';

import exercises from '../assets/exercises.json';
import imagePaths from '../assets/imagePath';

const muscles = [
  {id: 100, name: 'all', korName: '전체'},
  {id: 0, name: 'lower_body', korName: '하체'},
  {id: 1, name: 'chest', korName: '가슴'},
  {id: 2, name: 'back', korName: '등'},
  {id: 3, name: 'shoulder', korName: '어깨'},
  {id: 4, name: 'triceps', korName: '삼두근'},
  {id: 5, name: 'biceps', korName: '이두근'},
  {id: 6, name: 'core', korName: '코어'},
  {id: 7, name: 'full_body', korName: '전신'},
  {id: 8, name: 'others', korName: '기타'},
];

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

import {themeColorsContext} from '../contexts';

const AddExerciseModal = ({modalVisible, setModalVisible}) => {
  const themeColors = useContext(themeColorsContext);
  const [exerciseList, setExerciseList] = useState(exercises);
  const [selectedMuscle, setSelectedMuscle] = useState({
    id: 100,
    name: 'all',
    korName: '전체',
  });
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    setExerciseList(
      selectedMuscle.id === 100
        ? exercises
        : exercises.filter(item => item.target === selectedMuscle.name),
    );
  }, [selectedMuscle]);

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
            <TextInput style={styles.headerTextInput} />
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={muscles}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMuscle(item);
                  }}
                  style={[
                    styles.muscleSelector,
                    {
                      borderBottomWidth: selectedMuscle.id === item.id ? 3 : 0,
                    },
                  ]}>
                  <Text style={{color: themeColors.textColor}}>
                    {item.korName}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>

          {/* exercise list */}
          <FlatList
            contentContainerStyle={{paddingVertical: 10}}
            data={exerciseList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.exerciseContainer}>
                  <View
                    style={[
                      styles.exerciseImgContainer,
                      {backgroundColor: themeColors.boxColors[0]},
                    ]}>
                    <Image
                      resizeMode="contain"
                      style={{width: 50, height: 50, borderRadius: 35}}
                      source={imagePaths.find(a => a.id == item.id).uri}
                    />
                  </View>
                  <Text
                    style={[
                      styles.exerciseText,
                      {color: themeColors.textColor},
                    ]}>
                    {item.korName}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
          <View
            style={{
              backgroundColor: themeColors.modalColors[0],
              height: 90,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <TouchableOpacity
              style={[
                styles.doneButton,
                {backgroundColor: themeColors.buttonColors[1]},
              ]}>
              <Text style={{color: themeColors.textColor}}>선택 완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExerciseModal;

const styles = StyleSheet.create({
  modal: {
    width: '95%',
    height: '85%',
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
    elevation: 3,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    paddingTop: 5,
  },
  headerTextInput: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 8,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 5,
  },
  muscleSelector: {
    height: 40,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#3A98B9',
  },
  exerciseContainer: {
    zIndex: -1000,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  exerciseImgContainer: {
    height: 60,
    width: 60,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginRight: 20,
  },
  exerciseText: {
    fontSize: 17,
  },
  doneButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    height: 50,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
