import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ThemeColorsContext, UserContext} from '../contexts';

import {getUserRef} from '../logic/firebase';

export default function RoutineScreen({navigation: {navigate}}) {
  const themeColors = useContext(ThemeColorsContext);
  const {user, userProfile} = useContext(UserContext);

  const [routines, setRoutines] = useState();

  useEffect(() => {
    //user 없으면 실행 x
    if (user) {
      const userRef = getUserRef(user.uid);
      const userRoutinesRef = userRef.collection('Routines');

      // 리스너를 설정하여 변화를 감지하고, 변화가 발생하면 monthPlans를 업데이트합니다.
      userRoutinesRef.get().then(querySnapshot => {
        setRoutines(querySnapshot.docs);
      });
    }
  }, [user]);

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      <FlatList />
      <TouchableOpacity
        onPress={() => {
          navigate('EditRoutine', {});
        }}>
        <Text>푸가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
