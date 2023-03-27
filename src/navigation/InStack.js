import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

export default function InStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
