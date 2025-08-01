import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import FlatButton from '../ui/FlatButton';
import RegisterForm from './RegisterForm';
import { Colors } from '../../constants/styles';

function RegisterContent({ onRegister }) {

  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    email: false,
    password: false,
    password2: false
  });

  function switchAuthModeHandler() {
    navigation.replace('Login');
  }

  function submitHandler(credentials) {
    let { name, email, password, password2 } = credentials;

    name = name.trim();
    email = email.trim();
    password = password.trim();
    password2 = password2.trim();

    const nameIsValid = password.length > 3;
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsDontMatch = (password == password2);

    if (!nameIsValid || !emailIsValid || !passwordIsValid || !passwordsDontMatch) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        name: !nameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
        password2: !passwordsDontMatch
      });
      return;
    }
    onRegister({ name, email, password });
  }

  return (
    <View style={styles.registerContent}>
      <RegisterForm
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>Already registered?</FlatButton>
      </View>
    </View>
  );
}

export default RegisterContent;

const styles = StyleSheet.create({
  registerContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
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