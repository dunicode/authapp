import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MainScreen</Text>
            <Button title="Login" color="#841584" onPress={() => navigation.navigate('Login')} /> 
            <Button title="Register" color="#841584" onPress={() => navigation.navigate('Register')} /> 
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