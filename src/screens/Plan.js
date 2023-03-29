import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {themeColorsContext} from '../contexts';

//components
import PlanCalendar from '../components/calendar';

//logic
import {nowDate} from '../logic/date';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PlanScreen({navigation: {navigate}}) {
  const themeColors = useContext(themeColorsContext);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    setSelectedDate(nowDate()); // get current date yyyy-mm-dd format
  }, []);

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={{width: '100%'}}>
        <PlanCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <View style={styles.plansContainer}>
          <View style={styles.containerHeader}>
            <Text style={[styles.headerTitle, {color: themeColors.textColor}]}>
              계획 | {selectedDate}
            </Text>
          </View>
        </View>
        {/* ***************************<View>여기에 날짜별 계획 불러오기</View>************************** */}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.addButton,
          {backgroundColor: themeColors.buttonColors[2]},
        ]}
        onPress={() => {
          navigate('AddPlan', {date: selectedDate});
        }}>
        <AntDesign name="plus" color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  plansContainer: {padding: 15},
  containerHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  headerTitle: {fontSize: 20, fontWeight: '600'},
  plan: {},
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
});
