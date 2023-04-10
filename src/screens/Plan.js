import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {ThemeColorsContext, UserContext} from '../contexts';

//components
import PlanCalendar from '../components/Calendar';

//logic
import {getUserRef, deletePlans, firestore} from '../logic/firebase';
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedPlans, setCheckedPlans] = useState([]);

  const onPressEdit = () => {
    setIsEditMode(pre => !pre);
    setCheckedPlans([]);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  //delete selected plans
  const onPressDelete = async () => {
    try {
      await deletePlans(user, checkedPlans);
    } catch (error) {
      console.error('Error deleting plans:', error);
    }
  };

  useEffect(() => {
    const userRef = getUserRef(user.uid);
    const userPlansRef = userRef.collection('Plans');

    // 시작 날짜와 종료 날짜 설정
    const startDate = `${selectedMonth}-01`;
    const endDate = `${selectedMonth}-31`;

    // 리스너를 설정하여 변화를 감지하고, 변화가 발생하면 monthPlans를 업데이트합니다.
    const unsubscribe = userPlansRef
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .onSnapshot(querySnapshot => {
        setMonthPlans(querySnapshot.docs);
      });

    // 컴포넌트가 언마운트 될 때 리스너를 제거합니다.
    return () => {
      unsubscribe();
    };
  }, [selectedMonth]);

  useEffect(() => {
    setSelectedMonth(selectedDate.slice(0, 7));
    setIsEditMode(false);
    setCheckedPlans([]);
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
          markedList={monthPlans.map(plan => plan._data.date)}
        />
        <View style={styles.plansContainer}>
          {/* plans header */}
          <View style={styles.plansContainerHeader}>
            <Text
              style={[
                styles.plansContainerHeaderTitle,
                {color: themeColors.textColor},
              ]}>
              계획 | {selectedDate}
            </Text>

            {/* edit mode button */}
            <View style={{flexDirection: 'row'}}>
              {/* edit button */}
              <TouchableOpacity
                onPress={() => {
                  onPressEdit();
                }}
                style={[
                  styles.editButton,
                  {backgroundColor: themeColors.buttonColors[4]},
                ]}>
                <AntDesign name="edit" color={'white'} size={15} />
              </TouchableOpacity>

              {/* delete button */}
              {isEditMode ? (
                <TouchableOpacity
                  onPress={() => {
                    onPressDelete();
                  }}
                  style={[
                    styles.editButton,
                    {backgroundColor: themeColors.buttonColors[5]},
                  ]}>
                  <AntDesign name="delete" color={'white'} size={15} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>

        {/* 현재 날짜 계획들 불러옴 */}
        {monthPlans.map(({_data: plan, _ref: {id}}, index) => {
          if (plan.date === selectedDate) {
            return (
              <PlanBox
                key={id}
                id={id}
                plan={plan}
                isEditMode={isEditMode}
                checkedPlans={checkedPlans}
                setCheckedPlans={setCheckedPlans}
              />
            );
          } else {
            return null;
          }
        })}
      </ScrollView>

      {/* 계획 추가 버튼 */}
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
  plansContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plansContainerHeaderTitle: {fontSize: 20, fontWeight: '600'},
  editButton: {
    width: 35,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 10,
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
