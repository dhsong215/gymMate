import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import StartModal from '../screens/StartModal';
import MainTabs from './MainTabs';
import PlanScreen from '../screens/Plan';
import RoutineScreen from '../screens/Routine';

const Stack = createNativeStackNavigator();

export default function InStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, headerShadowVisible: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="Plan"
        component={PlanScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen name="Routine" component={RoutineScreen} />
      <Stack.Screen
        name="StartModal"
        component={StartModal}
        options={{animation: 'none', presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
}
