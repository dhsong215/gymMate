import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {auth, getUserRef, firestore} from './src/firebase';

import {themeColorsContext, userContext} from './src/contexts';
import {darkModeColors, lightModeColors} from './src/styles/themeColors';

import InStack from './src/navigation/InStack';
import OutStack from './src/navigation/OutStack';

export default function App() {
  const [appLoading, setAppLoading] = useState(true);
  const [userProfile, setUserProfile] = useState();
  const [user, setUser] = useState();

  const colorScheme = useColorScheme(); //define themeColors

  //get user profile. if user login first time, add new userprofile.
  useEffect(() => {
    //user 없으면 실행 x
    if (user) {
      const getUserProfile = async user => {
        const userRef = getUserRef(user.uid);
        let userProfile = await userRef.get();
        if (!userProfile._exists) {
          const data = {
            createAt: firestore.FieldValue.serverTimestamp(),
            imagePath: '',
            displayName: user.displayName,
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
          userProfile = await userRef.get({source: 'cache'});
        }
        return userProfile;
      };
      const profileData = getUserProfile(user);
      setUserProfile(profileData);
    }
  }, [user]);

  //set user login authentication
  function onAuthStateChanged(user) {
    setUser(user);
    if (appLoading) setAppLoading(false);
  }

  //user logout, login authentication control
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); //onAuthStateChanged에 유저 정보 인자를 전달합니다.
    return subscriber; // unsubscribe on unmount
  }, []);

  if (appLoading) return null;

  //no login -> choose login method screen
  if (!user) {
    return (
      <themeColorsContext.Provider
        value={colorScheme === 'dark' ? darkModeColors : lightModeColors}>
        <NavigationContainer>
          <OutStack />
        </NavigationContainer>
      </themeColorsContext.Provider>
    );
  }

  //user loggedin -> user home screen
  return (
    <userContext.Provider value={userProfile}>
      <themeColorsContext.Provider
        value={colorScheme === 'dark' ? darkModeColors : lightModeColors}>
        <NavigationContainer>
          <InStack />
        </NavigationContainer>
      </themeColorsContext.Provider>
    </userContext.Provider>
  );
}
