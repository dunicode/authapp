import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import FlatButton from '../ui/FlatButton';
import LoginForm from './LoginForm';
import { Colors } from '../../constants/styles';

function LoginContent({ onAuthenticate }) {

  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  function switchAuthModeHandler() {
    navigation.replace('Register');
  }

  function submitHandler(credentials) {
    let { email, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.loginContent}>
      <LoginForm
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>Create a new user</FlatButton>
      </View>
    </View>
  );
}

export default LoginContent;

const styles = StyleSheet.create({
  loginContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 3,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});