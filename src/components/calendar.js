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

export default function PlanCalendar({
  selectedDate,
  setSelectedDate,
  isRendering,
  setIsRendering,
  markedList,
}) {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const markedDatesData = markedList.reduce((accumulator, date) => {
      accumulator[date] = {
        marked: true,
        dotColor: 'grey',
      };
      return accumulator;
    }, {});

    setMarkedDates({
      ...markedDatesData,
      [selectedDate]: {
        selected: true,
        marked: markedDatesData[selectedDate]?.marked,
        selectedColor: 'grey',
      },
    });
  }, [markedList]);

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
      minDate={'2023-01-01'}
      onPressArrowLeft={(goBack, month) => {
        if (isRendering === false) {
          setIsRendering(true);
          goBack();
        }
      }}
      onMonthChange={month => {
        setSelectedDate(month.dateString);
      }}
      onDayPress={day => {
        setSelectedDate(day.dateString);
      }}
    />
  );
}
