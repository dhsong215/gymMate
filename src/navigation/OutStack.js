import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import TemporaryScreen from '../screens/Temporary';

const Stack = createNativeStackNavigator();

export default function OutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChooseLogin" component={TemporaryScreen} />
    </Stack.Navigator>
  );
}
