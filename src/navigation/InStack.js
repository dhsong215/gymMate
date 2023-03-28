import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartModal from '../screens/StartModal';

//screens
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

export default function InStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="StartModal"
        component={StartModal}
        options={{animation: 'none', presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
}
