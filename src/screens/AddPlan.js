import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {ScaleDecorator} from 'react-native-draggable-flatlist';

//context
import {themeColorsContext} from '../contexts';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//components
import AddExerciseModal from '../components/addExerciseModal';

const Header = ({goBack, title}) => {
  const themeColors = useContext(themeColorsContext);

  return (
    <SafeAreaView style={{backgroundColor: themeColors.screenHeaderColors[1]}}>
      <View
        style={[
          styles.headerContainer,
          {backgroundColor: themeColors.screenHeaderColors[1]},
        ]}>
        <View style={styles.headerTopContainer}>
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => goBack()}>
            <Ionicons
              name="arrow-back"
              size={30}
              color={themeColors.textColor}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {color: themeColors.textColor}]}>
            {title}
          </Text>
        </View>
        <View
          style={[
            styles.headerStateBox,
            {backgroundColor: themeColors.modalColors[1]},
          ]}></View>
      </View>
    </SafeAreaView>
  );
};

export default function AddPlanScreen({
  navigation: {setOptions, goBack},
  route: {params},
}) {
  const [workouts, setWorkouts] = useState([]);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const themeColors = useContext(themeColorsContext);

  useEffect(() => {
    setOptions({header: () => <Header goBack={goBack} title={params.date} />});
  }, []);

  const renderItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            {
              height: 40,
            },
          ]}>
          <Text style={styles.text}>{item.korName}</Text>
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
        data={workouts}
        onDragEnd={({data}) => setWorkouts(data)}
        keyExtractor={(item, index) => {
          return index;
        }}
        renderItem={renderItem}
      />

      {/* button container */}
      <View style={[styles.bottomButtonContainer]}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {backgroundColor: themeColors.buttonColors[1]},
          ]}
          onPress={() => {
            setAddExerciseModalVisible(true);
          }}>
          <Text
            style={[styles.bottomButtonText, {color: themeColors.textColor}]}>
            운동 추가하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {backgroundColor: themeColors.buttonColors[3]},
          ]}>
          <Text
            style={[styles.bottomButtonText, {color: themeColors.textColor}]}>
            저장
          </Text>
        </TouchableOpacity>
      </View>
      <AddExerciseModal
        modalVisible={addExerciseModalVisible}
        setModalVisible={setAddExerciseModalVisible}
        setWorkouts={setWorkouts}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
  },
  headerTopContainer: {flexDirection: 'row', padding: 10, alignItems: 'center'},
  headerBackButton: {marginRight: 20},
  headerTitle: {fontSize: 20, fontWeight: '600'},
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

  bottomButtonContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    bottom: 0,
  },
  bottomButton: {
    width: '50%',
    height: 80,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
