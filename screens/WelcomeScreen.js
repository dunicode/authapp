import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>WelcomeScreen</Text>
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