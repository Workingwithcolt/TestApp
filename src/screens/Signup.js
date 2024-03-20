import { StyleSheet, Text, View, Image, TextInput, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { button1 } from '../common/button'
import formcss, { formgroup, head1, head2, input, input1, label, link, link2 } from '../common/formcss'
import axios from 'axios'
import { urlHead } from '../helper/extrapropertise'
import LoadingSpinner from '../GenericComponent/LoadingSpinneer'
const Signup = ({ navigation }) => {

    const [fdata, setFdata] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [Process, setProcess] = useState({
        isloading: false,
        error: "",
        isSuccess: false

    });

    const onSignUp = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        try {
            if (fdata.email !== "" && fdata.password !== "" && fdata.username !== "") {
                setProcess({
                    ...Process, error: "", isloading: true
                })
                const res = await axios.post(urlHead + '/signup', fdata);
                console.log(res.data);
                if (res.data.error) {
                    setProcess({
                        ...Process, error: res.data.error, isloading: false
                    })
                } else {
                    setFdata({
                        username: '',
                        email: '',
                        password: '',
                    })

                    navigation.navigate('login')
                }
            } else {
                setProcess({
                    ...Process, error: "Please Fill All Fields..", isloading: false
                })
            }
        } catch (e) {
            console.log(e);
            setProcess({
                ...Process, error: e.response.data.error, isloading: false
            })
        }
    }
    if (Process.isloading) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <View style={styles.container}>

            <View style={styles.s1}>

            </View>
            <ScrollView style={styles.s2}>
                <Text style={head1}>Create a New Account</Text>
                <Text style={link2}>Already Registered?&nbsp;
                    <Text style={link}
                        onPress={() => navigation.navigate('login')}
                    >
                        Login here
                    </Text>
                </Text>
                {
                    Process.error !== "" &&
                    <View>
                        <Text style={formcss.errormessage}>{Process.error}</Text>
                    </View>
                }
                <View style={formgroup}>
                    <Text style={label}>username</Text>
                    <TextInput style={input} placeholder="Enter your username"
                        onChangeText={(text) => setFdata({ ...fdata, username: text })}
                    />
                </View>
                <View style={formgroup}>
                    <Text style={label}>Email</Text>
                    <TextInput style={input} placeholder="Enter your Email"
                        onChangeText={(text) => setFdata({ ...fdata, email: text })}
                    />
                </View>
                <View style={formgroup}>
                    <Text style={label}>Password</Text>
                    <TextInput style={input} placeholder="Enter your Password"
                        secureTextEntry={true}
                        onChangeText={(text) => setFdata({ ...fdata, password: text })}
                    />
                </View>
                <TouchableOpacity
                    onPress={onSignUp}
                >
                    <Text style={button1}>Signup</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Signup

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
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
    },
    small1: {
        color: '#fff',
        fontSize: 17,
    }
    ,
    h1: {
        fontSize: 30,
        color: '#fff',
    },
    s2: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,

    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FFB0CC",
        borderRadius: 20,
        padding: 10,
    },
    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    }
})