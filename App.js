import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';

import {themeColorsContext, userContext} from './src/contexts';
import {darkModeColors, lightModeColors} from './src/styles/themeColors';

import InStack from './src/navigation/InStack';
import OutStack from './src/navigation/OutStack';

export default function App() {
  const [user, setUser] = useState();
  const colorScheme = useColorScheme();
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
