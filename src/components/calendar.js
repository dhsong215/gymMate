import React, {useContext} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import {themeColorsContext} from '../contexts';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['월', '화', '수', '목', '금', '토', '일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

export default function CalendarComponent() {
  const themeColors = useContext(themeColorsContext);

  return (
    <Calendar
      style={{
        backgroundColor: themeColors.boxColors[0],
      }}
      theme={{
        calendarBackground: 'transparent',
        monthTextColor: '#867070',
        dayTextColor: '#867070',
      }}
      hideExtraDays={true}
      enableSwipeMonths={true}
    />
  );
}
