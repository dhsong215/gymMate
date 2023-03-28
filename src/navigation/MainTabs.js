import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screens
import TemporaryScreen from '../screens/Temporary';
import HomeScreen from '../screens/tabScreens/Home';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen name="Calender" component={TemporaryScreen} />
      <Tab.Screen name="Analysis" component={TemporaryScreen} />
      <Tab.Screen name="Social" component={TemporaryScreen} />
      <Tab.Screen name="More" component={TemporaryScreen} />
    </Tab.Navigator>
  );
}
