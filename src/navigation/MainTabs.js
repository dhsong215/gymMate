import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screens
import TemporaryScreen from '../screens/Temporary';
import HomeScreen from '../screens/tabScreens/Home';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '대시보드',
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calender"
        component={TemporaryScreen}
        options={{
          tabBarLabel: '기록',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={TemporaryScreen}
        options={{
          tabBarLabel: '분석',
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons name="analytics" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={TemporaryScreen}
        options={{
          tabBarLabel: '소셜',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="people-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={TemporaryScreen}
        options={{
          tabBarLabel: '더보기',
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons name="more-horiz" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
