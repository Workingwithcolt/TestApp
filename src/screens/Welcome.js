import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { button1 } from '../common/button'
import { CommonClass } from '../styles/Commonclass'
const Welcome = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
                <TouchableOpacity style={CommonClass.welcomebutton} onPress={() => navigation.navigate('login')}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={CommonClass.welcomebutton} onPress={() => navigation.navigate('signup')}>
                    <Text>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    head: {
        fontSize: 30,
        color: '#fff',
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    logo: {
        height: '20%',
        resizeMode: 'contain',
        marginBottom: 50,
    }
})