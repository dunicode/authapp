import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import RegisterContent from '../components/Auth/RegisterContent';
import { useNavigation } from '@react-navigation/native'

import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { register } from '../util/auth';

function RegisterScreen() {
    const [isRegistering, setIsRegistering] = useState(false);

    const authCtx = useContext(AuthContext);

    const navigation = useNavigation();

    async function registerHandler({ name, email, password }) {
        setIsRegistering(true);
        try {
            const message = await register(name, email, password);
            Alert.alert(
                'Register Successfully!',
                'The account was created!'
            );
            navigation.replace('Login');
        } catch (error) {
            console.log(error)
            Alert.alert(
                'Register failed!',
                'Could not register you. Please try again later!'
            );
        setIsRegistering(false);
        }
    }

    if (isRegistering) {
        return <LoadingOverlay message="Registering you..." />;
    }

    return (
        <RegisterContent onRegister={registerHandler} />
    )
}

export default RegisterScreen;