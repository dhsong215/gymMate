import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import LoginScreen from '../screens/Login';

const Stack = createNativeStackNavigator();

export default function OutStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChooseLogin" component={LoginScreen} />
    </Stack.Navigator>
  );
}
