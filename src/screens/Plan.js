import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ThemeColorsContext, UserContext} from '../contexts';
import {getUserRef, firestore} from '../logic/firebase';

//components
import PlanCalendar from '../components/Calendar';

//logic
import {nowDate} from '../logic/date';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlanBox from '../components/PlanBox';

export default function PlanScreen({navigation: {navigate}}) {
  const themeColors = useContext(ThemeColorsContext);
  const user = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthPlans, setMonthPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlans = async () => {
      const userRef = getUserRef(user.uid);
      const userPlansRef = userRef.collection('Plans');

      // 시작 날짜와 종료 날짜 설정
      const startDate = `${selectedMonth}-01`;
      const endDate = `${selectedMonth}-31`;

      userPlansRef
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .get({source: 'cache'})
        .then(querySnapshot => {
          setMonthPlans(querySnapshot._docs);
        })
        .catch(error => {
          console.error('Error getting documents from cache:', error);
        });
    };
    getPlans();
  }, [selectedMonth]);

  useEffect(() => {
    setSelectedMonth(selectedDate.slice(0, 7));
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(nowDate()); // get current date yyyy-mm-dd format
    setSelectedMonth(nowDate().slice(0, 7));
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
          setIsLoading={setIsLoading}
        />
        <View style={styles.plansContainer}>
          <View style={styles.plansContainerHeader}>
            <Text
              style={[
                styles.plansContainerHeaderTitle,
                {color: themeColors.textColor},
              ]}>
              계획 | {selectedDate}
            </Text>
          </View>
        </View>
        {/* ***************************<View>여기에 날짜별 계획 불러오기</View>************************** */}
        {/* {plans.map(({_data: plan}) => {
          return (
            <TouchableOpacity style={styles.planBox}>
              <Text style={{color: themeColors.textColor}}>{plan.title}</Text>
            </TouchableOpacity>
          );
        })} */}
        {monthPlans.map(({_data: plan}, index) => {
          console.log(plan);
          if (plan.date === selectedDate) {
            return <PlanBox key={plan.title + index} plan={plan} />;
          } else {
            return null;
          }
        })}
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
  plansContainerHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  plansContainerHeaderTitle: {fontSize: 20, fontWeight: '600'},
  planBox: {
    backgroundColor: 'grey',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
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
