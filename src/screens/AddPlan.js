import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

//assets
import exercises from '../assets/exercises.json';
import imagePaths from '../assets/imagePath';

//context
import {themeColorsContext} from '../contexts';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

const Header = ({goBack}) => {
  const themeColors = useContext(themeColorsContext);
  return (
    <View
      style={[
        styles.headerContainer,
        {backgroundColor: themeColors.screenHeaderColors[1]},
      ]}>
      <View style={styles.headerTopButtonContainer}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={30} color={themeColors.textColor} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.headerStateBox,
          {backgroundColor: themeColors.modalColors[0]},
        ]}></View>
    </View>
  );
};

const AddWorkoutModal = ({modalVisible, setModalVisible}) => {
  const themeColors = useContext(themeColorsContext);
  const [exerciseList, setExerciseList] = useState(exercises);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={[styles.modal, {backgroundColor: themeColors.modalColors[1]}]}>
          <View style={[styles.modalHeader]}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>close</Text>
            </TouchableOpacity>
          </View>
          {imagePaths ? (
            <ScrollView>
              {exerciseList.map(item => {
                return (
                  <TouchableOpacity style={styles.exerciseContainer}>
                    <View style={[styles.exerciseImgContainer]}>
                      <Image
                        resizeMode="contain"
                        style={{width: 50, height: 50, borderRadius: 35}}
                        source={imagePaths.find(a => a.id == item.id).uri}
                      />
                    </View>
                    <Text style={[{color: themeColors.textColor}]}>
                      {item.korName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default function AddPlanScreen({navigation: {setOptions, goBack}}) {
  const [workoutList, setWorkoutList] = useState([]);
  const [addWorkoutModalVisible, setAddWorkoutModalVisible] = useState(false);
  const themeColors = useContext(themeColorsContext);

  useEffect(() => {
    setOptions({header: () => <Header goBack={goBack} />});
  }, []);

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
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      {/* workout list */}
      <DraggableFlatList
        ListHeaderComponent={() => <View style={{marginTop: 50}}></View>}
        data={workoutList}
        onDragEnd={({data}) => setWorkoutList(data)}
        keyExtractor={item => item.key}
        renderItem={renderItem}
      />

      {/* button container */}
      <View style={[styles.footerButtonContainer]}>
        <TouchableOpacity
          style={[
            styles.addWorkoutButton,
            {backgroundColor: themeColors.buttonColors[1]},
          ]}
          onPress={() => {
            setAddWorkoutModalVisible(true);
          }}>
          <Text style={[{color: themeColors.textColor}]}>운동 추가하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.addWorkoutButton,
            {backgroundColor: themeColors.buttonColors[3]},
          ]}>
          <Text style={[{color: themeColors.textColor}]}>저장</Text>
        </TouchableOpacity>
      </View>
      <AddWorkoutModal
        modalVisible={addWorkoutModalVisible}
        setModalVisible={setAddWorkoutModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 110,
    elevation: 10,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerTopButtonContainer: {padding: 10},
  headerStateBox: {
    backgroundColor: 'white',
    height: 100,
    width: '92%',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  mainContainer: {
    flex: 1,
  },
  footerButtonContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    bottom: 0,
  },
  addWorkoutButton: {
    width: '50%',
    height: 80,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '95%',
    height: '90%',
    borderRadius: 15,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalHeader: {
    height: 60,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: 'grey',
  },
  exerciseContainer: {
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
  },
});
