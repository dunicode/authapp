import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useContext, useState } from 'react';
import { logout } from '../util/auth';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';

export default function HomeScreen() {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function logoutHandler() {
        setIsAuthenticating(true);
        try {
            const status = await logout(token);
            console.log('Logout successful with status:', status);
            authCtx.logout();
        } catch (error) {
            setIsAuthenticating(false);
            Alert.alert(
                'Logout failed!',
                error.message || 'Could not logout. Please try again later!'
            );
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging out..." />;
    }

    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <Button title="Logout" onPress={logoutHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 24,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});