import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screens
import TemporaryScreen from '../screens/Temporary';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TemporaryScreen} />
      <Tab.Screen name="Analysis" component={TemporaryScreen} />
      <Tab.Screen name="Calender" component={TemporaryScreen} />
      <Tab.Screen name="Social" component={TemporaryScreen} />
      <Tab.Screen name="More" component={TemporaryScreen} />
    </Tab.Navigator>
  );
}
