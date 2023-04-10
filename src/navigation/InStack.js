import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//context
import {ThemeColorsContext} from '../contexts';

//screens
import StartModal from '../screens/StartModal';
import MainTabs from './MainTabs';
import PlanScreen from '../screens/Plan';
import RoutineScreen from '../screens/Routine';
import EditPlanScreen from '../screens/EditPlan';
import WorkingScreen from '../screens/Working';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function InStack() {
  const themeColors = useContext(ThemeColorsContext);

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
      <Stack.Screen
        name="Working"
        component={WorkingScreen}
        options={{
          headerShown: true,
          headerTitle: '으쌰',
          presentation: 'card',
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="EditPlan"
        component={EditPlanScreen}
        options={{
          headerShown: true,
          headerTitle: '계획 추가',
          presentation: 'fullScreenModal',
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}
