import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import InStack from './src/navigation/InStack';

export default function App() {
  return (
    <NavigationContainer>
      <InStack />
    </NavigationContainer>
  );
}
