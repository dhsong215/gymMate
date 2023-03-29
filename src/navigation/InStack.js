import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//context
import {themeColorsContext} from '../contexts';

//screens
import StartModal from '../screens/StartModal';
import MainTabs from './MainTabs';
import PlanScreen from '../screens/Plan';
import RoutineScreen from '../screens/Routine';
import AddPlanScreen from '../screens/AddPlan';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function InStack() {
  const themeColors = useContext(themeColorsContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitleStyle: {color: themeColors.textColor},
        headerStyle: {backgroundColor: themeColors.screenHeaderColors[0]},
      }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />

      <Stack.Screen
        name="Plan"
        component={PlanScreen}
        options={{headerShown: true, headerTitle: '내 계획'}}
      />

      <Stack.Screen
        name="AddPlan"
        component={AddPlanScreen}
        options={{
          headerShown: true,
          headerTitle: '계획 추가',
          presentation: 'modal',
          animation: 'fade_from_bottom',
        }}
      />

      <Stack.Screen
        name="Routine"
        component={RoutineScreen}
        options={{headerShown: true, headerTitle: '내 루틴'}}
      />

      {/* modals */}
      <Stack.Screen
        name="StartModal"
        component={StartModal}
        options={{animation: 'none', presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
}
