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
        <View style={{backgroundColor: 'grey', height: 90, width: '100%'}}>
          <Text>운동 타이머</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const WorkoutPage = ({workout, workoutIndex}) => {
  const themeColors = useContext(ThemeColorsContext);

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
            width: 180,
            height: 180,
            borderRadius: 90,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: themeColors.backgroundColor,
              width: 160,
              height: 160,
              borderRadius: 80,
            }}></View>
        </View>
      </View>
      <View>
        <Text>entrys</Text>
      </View>
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
});
