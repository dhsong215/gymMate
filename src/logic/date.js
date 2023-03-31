export const nowDate = () => {
  const currentDate = new Date(Date.now());
  const datePart = currentDate.toLocaleDateString().split('/');
  return `${datePart[2]}-${
    datePart[0].length > 1 ? datePart[0] : '0' + datePart[0]
  }-${datePart[1]}`;
};

{
  /* <GestureHandlerRootView style={{flex: 1}}>
        <DraggableFlatList
          containerStyle={{flex: 1}}
          data={workouts}
          onDragEnd={({data}) => setWorkouts(data)}
          keyExtractor={(item, index) => `workout_${index}`}
          renderItem={({item, isActive, drag, getIndex}) =>
            renderItem({
              item,
              isActive,
              getIndex,
              drag,
              setOptionVisible,
              optionVisible,
              setWorkouts,
              workouts,
            })
          }
        />
      </GestureHandlerRootView> */
}
