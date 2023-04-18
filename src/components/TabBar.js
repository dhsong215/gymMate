import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//contexts
import {ThemeColorsContext, NowWorkingContext} from '../contexts';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabBar = ({state, descriptors, navigation}) => {
  const themeColors = useContext(ThemeColorsContext);
  const {nowWorking} = useContext(NowWorkingContext);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: themeColors.backgroundColor,
      }}>
      {nowWorking && nowWorking.planData ? (
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgba(144, 144, 144, 0.1)',
            height: 50,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Working', nowWorking);
            }}
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              flexDirection: 'row',
            }}>
            <Text style={{color: themeColors.textColor}}>
              {nowWorking.planData.title}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Render the tab buttons */}
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: insets.bottom,
          backgroundColor: themeColors.backgroundColor,
          shadowColor: themeColors.tabBarShadowColor,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 15,
          position: 'relative',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Define your custom icon rendering logic here
          let iconName;
          if (route.name === 'Home') {
            iconName = 'dashboard';
            IconComponent = FontAwesome;
          } else if (route.name === 'Plan') {
            iconName = 'calendar';
            IconComponent = Ionicons;
          } else if (route.name === 'Analysis') {
            iconName = 'analytics';
            IconComponent = MaterialIcons;
          } else if (route.name === 'Social') {
            iconName = 'people-circle';
            IconComponent = Ionicons;
          } else if (route.name === 'More') {
            iconName = 'more-horiz';
            IconComponent = MaterialIcons;
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <IconComponent
                name={iconName}
                color={isFocused ? '#FF6666' : 'gray'}
                size={24}
              />
              <Text
                style={{
                  color: isFocused ? '#FF6666' : 'gray',
                  fontSize: 12,
                  marginBottom: 3,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
