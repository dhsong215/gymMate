import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {themeColorsContext} from '../contexts';

import PlanCalendar from '../components/calendar';

export default function PlanScreen({navigation: {navigate}}) {
  const themeColors = useContext(themeColorsContext);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    //make now date 'yyyy-mm-dd'format
    const currentDate = new Date(Date.now());
    const datePart = currentDate.toLocaleDateString().split('/');
    setSelectedDate(
      `${datePart[2]}-${
        datePart[0].length > 1 ? datePart[0] : '0' + datePart[0]
      }-${datePart[1]}`,
    );
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
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.addButton,
          {backgroundColor: themeColors.buttonColors[2]},
        ]}
        onPress={() => {
          navigate('AddPlan');
        }}></TouchableOpacity>
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
    right: 30,
    bottom: 60,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
