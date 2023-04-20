import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {auth, getUserRef, firestore} from './src/logic/firebase';
import {LogBox} from 'react-native';

import {
  NowWorkingContext,
  ThemeColorsContext,
  UserContext,
} from './src/contexts';
import {darkModeColors, lightModeColors} from './src/styles/themeColors';
import {getData, storeData} from './src/logic/asyncStorage';

import InStack from './src/navigation/InStack';
import OutStack from './src/navigation/OutStack';

LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function App() {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState({});
  const [nowWorking, setNowWorking] = useState({});

  const colorScheme = useColorScheme(); //define themeColors

  //get user profile. if user login first time, add new userprofile.
  useEffect(() => {
    //user 없으면 실행 x
    if (user) {
      const getUserProfile = async user => {
        const userRef = getUserRef(user.uid);
        let userProfileData = await userRef.get();
        if (!userProfileData._exists) {
          const data = {
            createAt: firestore.FieldValue.serverTimestamp(),
            imagePath: '',
            displayName: user.displayName,
            email: user.email,
            followings: [],
            followers: [],
            isPremium: false,
            isPublic: false,
            userState: {
              lastWork: null,
              totalWeight: 0,
              totalDays: 0,
              totalHours: 0,
            },
          };
          await getUserRef(user.uid).set(data);
          userProfileData = await userRef.get({source: 'cache'});
        }
        setUserProfile(userProfileData._data);
      };

      getUserProfile(user);
    }
  }, [user]);

  //set user login authentication
  function onAuthStateChanged(user) {
    setUser(user);
    if (appLoading) setAppLoading(false);
  }

  //user logout, login authentication control
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('nowWorkingPlan');
      if (data === null) {
        return;
      }
      setNowWorking(data);
    };
    fetchData();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); //onAuthStateChanged에 유저 정보 인자를 전달합니다.
    return subscriber; // unsubscribe on unmount
  }, []);

  const updateData = async newValue => {
    await storeData('nowWorkingPlan', newValue);
    setNowWorking(newValue);
  };

  if (appLoading) return null;

  //no login -> choose login method screen
  if (!user) {
    return (
      <ThemeColorsContext.Provider
        value={colorScheme === 'dark' ? darkModeColors : lightModeColors}>
        <NavigationContainer>
          <OutStack />
        </NavigationContainer>
      </ThemeColorsContext.Provider>
    );
  }

  //user loggedin -> user home screen
  return (
    <NowWorkingContext.Provider value={{nowWorking, updateData}}>
      <UserContext.Provider value={{user, userProfile}}>
        <ThemeColorsContext.Provider
          value={colorScheme === 'dark' ? darkModeColors : lightModeColors}>
          <NavigationContainer>
            <InStack />
          </NavigationContainer>
        </ThemeColorsContext.Provider>
      </UserContext.Provider>
    </NowWorkingContext.Provider>
  );
}
