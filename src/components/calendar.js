import React, {useState, useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

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
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

export default function PlanCalendar({selectedDate, setSelectedDate}) {
  const [markedDates, setMarkedDates] = useState({});
  //markedDates 가져오기

  useEffect(() => {
    setMarkedDates({
      [selectedDate]: {selected: true, selectedColor: 'green'},
      //나중에 진짜 계획 추가
      '2023-03-17': {marked: true},
      '2023-03-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    });
  }, [selectedDate]);

  return (
    <Calendar
      markedDates={markedDates}
      style={{
        backgroundColor: '#262A56',
      }}
      theme={{
        calendarBackground: 'transparent',
        monthTextColor: 'white',
        dayTextColor: 'white',
      }}
      hideExtraDays={true}
      enableSwipeMonths={true}
      minDate={'2023-01-01'}
      onDayPress={day => {
        setSelectedDate(day.dateString);
      }}
    />
  );
}
