import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//context
import {NowWorkingContext, ThemeColorsContext, UserContext} from '../contexts';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {changePlanDate, firestore} from '../logic/firebase';
import {nowDate} from '../logic/date';

export default function PlanBox({
  plan,
  isEditMode,
  setIsEditMode,
  setCheckedPlans,
  checkedPlans,
  id,
}) {
  const themeColors = useContext(ThemeColorsContext);
  const {updateData, nowWorking} = useContext(NowWorkingContext);
  const {user} = useContext(UserContext);
  const navigation = useNavigation();

  const doPlanAlert = () => {
    if (Object.keys(nowWorking).length !== 0) {
      Alert.alert(
        '진행중인 운동이 있습니다.',
        '진행중인 운동을 먼저 완료해 주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
    } else if (plan.isDone === true) {
      Alert.alert(
        '이미 완료한 운동입니다.',
        '완료한 운동은 수정만 가능합니다.',
        [
          {
            text: '수정',
            onPress: () => {
              navigation.navigate('EditPlan', {
                plan,
                id,
              });
            },
          },
          {
            text: '확인',
          },
        ],
      );
    } else if (plan.date !== nowDate()) {
      Alert.alert(
        '오늘 운동만 수행 가능합니다.',
        `해당 운동을 오늘 날짜로 이동시킬까요? \n ${plan.title}`,
        [
          {
            text: 'No',
          },
          {
            text: 'Yes!',
            onPress: async () => {
              const date = nowDate();
              await changePlanDate(user, date, plan, id);
            },
          },
        ],
      );
    } else {
      Alert.alert('운동을 수행하시겠습니까?', plan.title, [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes!',
          onPress: async () => {
            const currentTime = new Date();
            const planData = {
              ...plan,
              startTimestamp: firestore.Timestamp.fromDate(currentTime),
            };
            await updateData({planData, id});
            navigation.goBack();
            navigation.navigate('Working', {planData, id});
          },
        },
      ]);
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: themeColors.boxColors[0]}]}>
      {isEditMode ? (
        <TouchableOpacity
          onPress={() => {
            setCheckedPlans(pre => {
              if (pre.find(item => item === id)) {
                return pre.filter(item => item !== id);
              } else {
                return [...pre, id];
              }
            });
          }}
          style={{marginRight: 10}}>
          <MaterialIcons
            name={
              checkedPlans.find(item => item === id)
                ? 'check-box'
                : 'check-box-outline-blank'
            }
            size={25}
            color={themeColors.textColor}
          />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.plan} onPress={doPlanAlert}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Text style={[styles.planTitle, {color: themeColors.textColor}]}>
            {plan.title}
          </Text>
          {plan.isDone === true && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <MaterialIcons name="check-circle" color={'#009FBD'} size={17} />
            </View>
          )}
        </View>

        {plan.workouts.map(workout => (
          <View key={workout.workoutId}>
            <Text style={[{color: themeColors.textColor, opacity: 0.8}]}>
              {workout.workoutName} {workout.entries.length}세트
            </Text>
          </View>
        ))}
      </TouchableOpacity>
      {isEditMode ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditPlan', {
              plan,
              id,
            });
            setIsEditMode(false);
          }}
          style={{marginLeft: 10}}>
          <MaterialIcons name="edit" size={25} color={themeColors.textColor} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plan: {flex: 1},
  planTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
});
