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
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => {
              setWorkoutsReorderModalVisible(true);
            }}>
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

export default function WorkingScreen({navigation: {setOptions, goBack}}) {
  const themeColors = useContext(ThemeColorsContext);

  const [isLoading, setIsLoading] = useState(true);
  const [nowWorking, setNowWorking] = useState({});

  useEffect(() => {
    setOptions({
      header: () => <Header goBack={goBack} title={nowWorking.title} />,
    });
  }, [nowWorking]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('nowOnWorking');
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
          {nowWorking.workouts.map(workout => (
            <Text style={{color: themeColors.textColor, width: WINDOW_WIDTH}}>
              {workout.workoutName}
            </Text>
          ))}
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
});
