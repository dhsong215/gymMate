import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//context
import {ThemeColorsContext, NowWorkingContext} from '../contexts';
//screens
import TemporaryScreen from '../screens/Temporary';
import HomeScreen from '../screens/tabScreens/Home';
import PlanScreen from '../screens/Plan';
import WorkingScreen from '../screens/Working';

//icons
import TabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const themeColors = useContext(ThemeColorsContext);

  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerStyle: {backgroundColor: themeColors.screenHeaderColors[0]},
        headerShadowVisible: false,
        headerTitleStyle: {color: themeColors.textColor},
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
        name="Plan"
        component={PlanScreen}
        options={{
          headerTitle: '플랜',
          tabBarLabel: '플랜',
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
      <Tab.Screen
        name="Working"
        component={WorkingScreen}
        options={{
          headerShown: true,
          headerTitle: '으쌰',
          animation: 'fade_from_bottom',
          tabBarStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
}
