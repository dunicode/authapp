import { useState } from 'react';
import { Alert } from 'react-native';
import RegisterContent from '../components/Auth/RegisterContent';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { register } from '../util/auth';

function RegisterScreen() {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigation = useNavigation();

    async function registerHandler({ name, email, password }) {
        setIsRegistering(true);
        try {
            // 1. Esperar la respuesta de registro
            const result = await register(name, email, password);
            
            // 2. Mostrar mensaje específico del backend si está disponible
            const successMessage = result.message || 'The account was created successfully!';
            
            Alert.alert(
                'Registration Successful!',
                successMessage,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.replace('Login')
                    }
                ]
            );
        } catch (error) {
            // 3. Mostrar el mensaje de error específico
            const errorMessage = error.message || 'Could not register you. Please try again later!';
            
            Alert.alert(
                'Registration Failed',
                errorMessage
            );
        } finally {
            // 4. Siempre detener el indicador de carga
            setIsRegistering(false);
        }
    }

    if (isRegistering) {
        return <LoadingOverlay message="Creating your account..." />;
    }

    return (
        <RegisterContent onRegister={registerHandler} />
    );
}

export default RegisterScreen;