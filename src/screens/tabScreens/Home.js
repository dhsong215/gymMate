import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

//context
import {userContext} from '../../contexts';
import {themeColorsContext} from '../../contexts';

export default function HomeScreen({navigation: {navigate}}) {
  const userProfile = useContext(userContext); //useState로 수정하기
  const themeColors = useContext(themeColorsContext);

  const [routines, setRoutines] = useState([]);

  return userProfile !== {} ? (
    <SafeAreaView
      style={{flex: 1, backgroundColor: themeColors.backgroundColor}}>
      <FlatList
        ListHeaderComponent={
          <View>
            {/* profile container */}
            <View style={[styles.profileContainer]}>
              <View style={[styles.profileImageContainer]}></View>
              <View style={[styles.profileInfo]}>
                <Text
                  style={[styles.displayName, {color: themeColors.textColor}]}>
                  {userProfile.displayName}
                </Text>
                <View style={[styles.userStateContainer]}>
                  <Text
                    style={[styles.userState, {color: themeColors.textColor}]}>
                    Lv.1
                  </Text>
                  <Text
                    style={[styles.userState, {color: themeColors.textColor}]}>
                    {/* {userProfile.userState.totalDays}일째 운동중! */}
                  </Text>
                </View>
              </View>
            </View>

            {/* 목표박스 */}
            <View style={[styles.goalsContainer]}>
              <TouchableOpacity
                style={[
                  styles.addGoals,
                  {backgroundColor: themeColors.boxColors[0]},
                ]}>
                <Text
                  style={[styles.addGoalsText, {color: themeColors.textColor}]}>
                  목표 추가
                </Text>
              </TouchableOpacity>
            </View>

            {/* 운동시작 버튼 */}
            <View style={[styles.goalsContainer]}>
              <TouchableOpacity
                style={[
                  styles.startWorkButton,
                  {backgroundColor: themeColors.buttonColors[0]},
                ]}
                onPress={() => {
                  navigate('StartModal');
                }}>
                <Text
                  style={[
                    styles.startWorkText,
                    {color: themeColors.textColor},
                  ]}>
                  운동 시작
                </Text>
              </TouchableOpacity>
            </View>

            {/* weekly analysis */}
            <View style={styles.weeklyContainer}>
              <View style={styles.ContainerHeader}>
                <Text style={[styles.title, {color: themeColors.textColor}]}>
                  최근 일주일
                </Text>
                <TouchableOpacity
                  style={[
                    styles.detailButton,
                    {backgroundColor: themeColors.textColor},
                  ]}></TouchableOpacity>
              </View>
              <View
                style={[
                  styles.weeklyChart,
                  {backgroundColor: themeColors.boxColors[0]},
                ]}></View>
            </View>

            {/* my routines */}
            <View style={styles.routinesContainer}>
              <View style={[styles.ContainerHeader]}>
                <Text style={[styles.title, {color: themeColors.textColor}]}>
                  루틴
                </Text>
                <TouchableOpacity
                  style={[
                    styles.detailButton,
                    {backgroundColor: themeColors.textColor},
                  ]}></TouchableOpacity>
              </View>
              {routines.length > 0 ? (
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={styles.routines}
                  style={styles.routinesPosition}>
                  <View
                    style={[
                      styles.routine,
                      {
                        backgroundColor: themeColors.boxColors[0],
                      },
                    ]}></View>
                </ScrollView>
              ) : (
                <View
                  style={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: themeColors.textColor, opacity: 0.5}}>
                    루틴을 추가하세요.
                  </Text>
                </View>
              )}
            </View>

            {/* latest logs */}
            <View style={styles.ContainerHeader}>
              <Text style={[styles.title, {color: themeColors.textColor}]}>
                최근 기록
              </Text>
              <TouchableOpacity
                style={[
                  styles.detailButton,
                  {backgroundColor: themeColors.textColor},
                ]}></TouchableOpacity>
            </View>
          </View>
        }
        ListHeaderComponentStyle={{
          paddingHorizontal: 20,
        }}
        data={[]}
        renderItem
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  //자주쓰는거
  title: {
    fontWeight: '600',
    fontSize: 25,
  },
  detailButton: {width: 25, height: 25},
  ContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  //하나만 있는거
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
    marginRight: 20,
    backgroundColor: 'darkgrey',
  },
  profileInfo: {
    marginVertical: 40,

    flex: 1,
    justifyContent: 'space-between',
  },
  displayName: {
    fontSize: 25,
  },
  userStateContainer: {
    flexDirection: 'row',
    width: '100%',
    heigth: 30,
    justifyContent: 'space-between',
  },
  userState: {
    fontSize: 20,
    fontWeight: '400',
  },
  goalsContainer: {marginBottom: 10},
  addGoals: {
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addGoalsText: {fontSize: 15, fontWeight: '600'},
  startWorkButton: {
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  startWorkText: {fontSize: 15, fontWeight: '600'},
  weeklyContainer: {marginBottom: 20},
  weeklyChart: {
    height: 150,
    width: '100%',
    borderRadius: 15,
  },
  routinesContainer: {
    marginBottom: 20,
  },
  routinesPosition: {
    position: 'relative',
    left: -20,
  },
  routines: {paddingHorizontal: 20},
  routine: {
    width: 200,
    height: 100,
    borderRadius: 15,
  },
});
