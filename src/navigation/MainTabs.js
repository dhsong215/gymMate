import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//context
import {themeColorsContext} from '../contexts';
//screens
import TemporaryScreen from '../screens/Temporary';
import HomeScreen from '../screens/tabScreens/Home';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const themeColors = useContext(themeColorsContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themeColors.backgroundColor,
          shadowColor: themeColors.tabBarShadowColor,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 15,
          position: 'absolute',
        },
        headerStyle: {backgroundColor: themeColors.screenHeaderColors[0]},
        headerShadowVisible: false,
        headerTitleStyle: {color: themeColors.textColor},
        tabBarActiveTintColor: '#FF6666',
        tabBarLabelStyle: {marginBottom: 4},
      }}>
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
