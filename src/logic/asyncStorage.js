import AsyncStorage from '@react-native-async-storage/async-storage';

//store data type object
export const storeData = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('async storage storeData error: ', e);
  }
};

//get data type object
export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('async storage getData error: ', e);
  }
};

//store data type string
export const storeStringData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.log('async storage storeStringData error: ', e);
  }
};

//get data type string
export const getStringData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return 0;
    }
  } catch (e) {
    console.log('async storage getStringData error: ', e);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('removeData error: ', e);
  }

  console.log('Done.');
};
