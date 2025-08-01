import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import LoginContent from '../components/Auth/LoginContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      setLoginAttempts(0); 
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      
      let alertMessage = error.message;
      
      if (loginAttempts >= 2 && !error.message.includes('reset')) {
        alertMessage += '\n\nForgot your password? Consider resetting it.';
      }
      
      Alert.alert(
        'Authentication Failed',
        alertMessage,
        loginAttempts >= 2 ? [
          {
            text: 'Reset Password',
            onPress: () => navigation.navigate('ResetPassword'),
            style: 'destructive'
          },
          { text: 'Try Again' }
        ] : undefined
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Authenticating..." />;
  }

  return <LoginContent onAuthenticate={loginHandler} />;
}

export default LoginScreen;