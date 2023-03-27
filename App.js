import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {auth} from './src/firebase';

import {themeColorsContext, userContext} from './src/contexts';
import {darkModeColors, lightModeColors} from './src/styles/themeColors';

import InStack from './src/navigation/InStack';
import OutStack from './src/navigation/OutStack';

export default function App() {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState();
  const colorScheme = useColorScheme();

  function onAuthStateChanged(user) {
    setUser(user);
    if (appLoading) setAppLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); //onAuthStateChanged에 유저 정보 인자를 전달합니다.
    return subscriber; // unsubscribe on unmount
  }, []);

  if (appLoading) return null;

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

  return (
    <userContext.Provider value={user}>
      <themeColorsContext.Provider
        value={colorScheme === 'dark' ? darkModeColors : lightModeColors}>
        <NavigationContainer>
          <InStack />
        </NavigationContainer>
      </themeColorsContext.Provider>
    </userContext.Provider>
  );
}
