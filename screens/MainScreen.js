import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/styles';

export default function MainScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MainScreen</Text>
            <View style={styles.btnbox}>
                <Button title="Login" color="#f0f0f0" onPress={() => navigation.navigate('Login')} /> 
                <Button title="Register" color="#f0f0f0" onPress={() => navigation.navigate('Register')} /> 
            </View>
            
        </View>
    )
}
    
const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.primary800,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnbox: {
        marginTop: 10,
    }
});