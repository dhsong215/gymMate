import React, {useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
//context
import {NowWorkingContext, ThemeColorsContext} from '../contexts';
//logic
import {nowDate} from '../logic/date';
import {firestore} from '../logic/firebase';

export default function StartModal({navigation: {goBack, navigate}}) {
  const themeColors = useContext(ThemeColorsContext);
  const {nowWorking, updateData} = useContext(NowWorkingContext);
  const modalPositionY = useRef(new Animated.Value(0)).current;

  const startUp = Animated.spring(modalPositionY, {
    toValue: -400,
    tension: 50,
    useNativeDriver: true,
  });

  const hideModal = Animated.timing(modalPositionY, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });

  useEffect(() => {
    startUp.start();
  }, []);

  const opacity = modalPositionY.interpolate({
    inputRange: [-400, 0],
    outputRange: [0.3, 0],
  });

  return (
    <>
      <Animated.View
        style={[styles.mainContainer, {backgroundColor: 'black', opacity}]}>
        <Pressable
          style={{flex: 1}}
          onPress={() => {
            hideModal.start(() => goBack());
          }}></Pressable>
      </Animated.View>

      <Animated.View
        style={[
          styles.modal,
          {
            backgroundColor: themeColors.modalColors[0],
            transform: [{translateY: modalPositionY}],
          },
        ]}>
        {/* go Plan */}
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: themeColors.buttonColors[1]},
          ]}
          onPress={() => {
            hideModal.start(() => {
              goBack();
              navigate('Plan');
            });
          }}>
          <Text style={[styles.buttonText, {color: themeColors.textColor}]}>
            계획 불러오기 / 생성
          </Text>
        </TouchableOpacity>

        {/* go Routine */}
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: themeColors.buttonColors[1]},
          ]}
          onPress={() => {
            hideModal.start(() => {
              goBack();
              navigate('Routine');
            });
          }}>
          <Text style={[styles.buttonText, {color: themeColors.textColor}]}>
            루틴 가져오기 / 생성
          </Text>
        </TouchableOpacity>

        {/* go Start */}
        <TouchableOpacity
          onPress={() => {
            const currentTime = new Date();
            const planData = {
              title: `${nowDate()} 운동`,
              date: nowDate(),
              startTimestamp: firestore.Timestamp.fromDate(currentTime),
              finishTimestamp: null,
              isDone: false,
              time: null,
              routine: null,
              workouts: [],
              exercises: [],
              createdAt: firestore.FieldValue.serverTimestamp(),
            };
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
            } else {
              updateData({planData, id: 'temporary'});
              navigate('Working', {planData, id: 'temporary'});
            }
          }}
          style={[styles.button, {backgroundColor: '#B8621B'}]}>
          <Text style={[styles.buttonText, {color: 'white'}]}>바로 시작!</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  //보여지는 높이 : 300
  modal: {
    position: 'absolute',
    width: '100%',
    height: 400,
    borderRadius: 20,
    bottom: -520,
    paddingBottom: 120, // radius:20 + bottom-100:100
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 30,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 8,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
