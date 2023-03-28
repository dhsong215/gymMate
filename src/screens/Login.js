import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {themeColorsContext} from '../contexts';
import {auth, GoogleSignin} from '../firebase';

async function onGoogleButtonPress() {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
}

function GoogleSignIn() {
  return (
    <Button title="Google Sign-In" onPress={() => onGoogleButtonPress()} />
  );
}

export default function LoginScreen() {
  const themeColors = useContext(themeColorsContext);
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: themeColors.backgroundColor},
      ]}>
      <View style={styles.welcomeContainer}>
        <Text style={[styles.greeting, {color: themeColors.textColor}]}>
          짐메이트에 오신것을 환영합니다!
        </Text>
        <Text style={[styles.subGreeting, {color: themeColors.textColor}]}>
          로그인 방법을 선택해 주세요.
        </Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <GoogleSignIn />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 10,
  },
  subGreeting: {
    opacity: 0.7,
    fontSize: 15,
  },
});
