import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {ThemeColorsContext} from '../contexts';

//logic
import {getData} from '../logic/asyncStorage';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

//components
import Entry from '../components/Entry';

const WINDOW_WIDTH = Dimensions.get('window').width;

const Header = ({goBack, title}) => {
  const themeColors = useContext(ThemeColorsContext);

  return (
    <SafeAreaView style={{backgroundColor: themeColors.screenHeaderColors[1]}}>
      <View style={[styles.headerContainer]}>
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
          <TouchableOpacity style={styles.headerBackButton} onPress={() => {}}>
            <Ionicons
              name="list-circle-outline"
              size={35}
              color={themeColors.textColor}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'grey',
            height: 90,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>타이머</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const WorkoutPage = ({workout, workoutIndex}) => {
  const themeColors = useContext(ThemeColorsContext);

  const [entries, setEntries] = useState(workout.entries);

  return (
    <View style={styles.workoutPageContainer}>
      <Text style={[styles.workoutIndex, {color: themeColors.textColor}]}>
        {workoutIndex}
      </Text>
      <Text style={[styles.workoutName, {color: themeColors.textColor}]}>
        {workout.workoutName}
      </Text>
      <Text style={[styles.workoutTarget, {color: themeColors.textColor}]}>
        {workout.target}
      </Text>

      {/* 그래프 자리 */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 200,
        }}>
        <View
          style={{
            backgroundColor: 'grey',
            width: 150,
            height: 150,
            borderRadius: 75,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: themeColors.backgroundColor,
              width: 120,
              height: 120,
              borderRadius: 60,
            }}></View>
        </View>
      </View>

      <ScrollView>
        {entries.map((entry, index) => (
          <Entry
            key={`${workout.workoutId}${index}`}
            index={index}
            item={entry}
            entries={entries}
            setEntries={setEntries}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default function WorkingScreen({navigation: {setOptions, goBack}}) {
  const themeColors = useContext(ThemeColorsContext);

  const [isLoading, setIsLoading] = useState(true);
  const [nowWorking, setNowWorking] = useState({});

  useEffect(() => {
    setOptions({
      header: () => (
        <Header
          goBack={goBack}
          title={isLoading ? 'Working' : nowWorking.title}
        />
      ),
    });
  }, [isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('nowWorking');
      setNowWorking(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      {isLoading === false ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          {nowWorking.workouts.map((workout, index) => {
            const workoutIndex = `${index + 1} / ${nowWorking.workouts.length}`;
            return (
              <WorkoutPage
                key={index}
                workoutIndex={workoutIndex}
                workout={workout}
              />
            );
          })}
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}

      {/* 운동추가, 완료 버튼 */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {backgroundColor: themeColors.buttonColors[1]},
          ]}></TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {backgroundColor: themeColors.buttonColors[5]},
          ]}></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTopContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {fontSize: 18, fontWeight: '600', maxWidth: 300, maxHeight: 30},
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutPageContainer: {width: WINDOW_WIDTH, padding: 10},
  workoutIndex: {opacity: 0.7, marginBottom: 8},
  workoutName: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 3,
  },
  workoutTarget: {
    opacity: 0.7,
    fontSize: 17,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  bottomButton: {
    width: 185,
    height: 70,
    borderRadius: 10,
  },
});
