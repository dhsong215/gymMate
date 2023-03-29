import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {themeColorsContext} from '../contexts';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({goBack}) => {
  const themeColors = useContext(themeColorsContext);
  return (
    <View
      style={[
        styles.headerContainer,
        {backgroundColor: themeColors.screenHeaderColor},
      ]}>
      <View style={styles.headerTopButtonContainer}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={30} color={themeColors.textColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerStateBox}></View>
    </View>
  );
};

export default function AddPlanScreen({navigation: {setOptions, goBack}}) {
  const themeColors = useContext(themeColorsContext);

  useEffect(() => {
    setOptions({header: () => <Header goBack={goBack} />});
  }, []);

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      <ScrollView></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 110,
    elevation: 10,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerTopButtonContainer: {padding: 10},
  headerStateBox: {
    backgroundColor: 'white',
    height: 100,
    width: '92%',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  mainContainer: {
    flex: 1,
  },
});
