import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function RegisterForm({ onSubmit, credentialsInvalid }) {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPassword2, setEnteredPassword2] = useState('');

  const {
    name: nameIsValid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    password2: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'password2':
        setEnteredPassword2(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      password2: enteredPassword2
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Name"
          onUpdateValue={updateInputValueHandler.bind(this, 'name')}
          value={setEnteredName}
          isInvalid={nameIsValid}
        />
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <Input
          label="Password Confirm"
          onUpdateValue={updateInputValueHandler.bind(this, 'password2')}
          secure
          value={enteredPassword2}
          isInvalid={passwordsDontMatch}
        />
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            Register
          </Button>
        </View>
      </View>
    </View>
  );
}

export default RegisterForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});