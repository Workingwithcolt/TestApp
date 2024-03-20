import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { button1 } from '../common/button'
import { formgroup, head1, head2, input, label, link, link2 } from '../common/formcss'
import { urlHead } from '../helper/extrapropertise'
import axios from 'axios'
import LoadingSpinner from '../GenericComponent/LoadingSpinneer'
import formcss from '../common/formcss'
import { CommonClass } from '../styles/Commonclass'


const Login = ({ navigation }) => {
    const [fdata, setFdata] = useState({
        email: '',
        password: ''
    })
    const [Process, setProcess] = useState({
        isloading: false,
        error: "",
        isSuccess: false

    });

    const [errormsg, setErrormsg] = useState(null);

    const onLogin = async (e) => {
        try {
            if (fdata.email !== "" && fdata.password !== "") {
                setProcess({
                    ...Process, error: "", isloading: true
                })
                const res = await axios.post(urlHead + '/signin', fdata);
                console.log(res.data.user);
                if (res.data.error) {
                    setProcess({
                        ...Process, error: res.data.error, isloading: false
                    })
                } else {
                    navigation.navigate('homepage', {
                        user: res.data.user,
                        token: res.data.token
                    })
                    setProcess({
                        ...Process, error: "", isloading: false
                    })
                    setFdata({
                        email: '',
                        password: ''
                    })
                }
            } else {
                setProcess({
                    ...Process, error: "Please Fill All Fields..", isloading: false
                })
            }
        } catch (e) {
            setProcess({
                ...Process, error: e.response.data.error, isloading: false
            })
        }
    }

    if (Process.isloading) {
        return (
            <LoadingSpinner size='large' />
        )
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.s2}>
                <Text style={head1}>Login</Text>
                <Text style={head2}>Sign in to continue</Text>
                {
                    Process.error !== "" &&
                    <View>
                        <Text style={formcss.errormessage}>{"Contact Admin"}</Text>
                    </View>
                }
                <View style={formgroup}>
                    <Text style={label}>Email</Text>
                    <TextInput style={input}
                        placeholder="Enter your email"

                        onPressIn={() => setErrormsg(null)}
                        onChangeText={(text) => setFdata({ ...fdata, email: text })}
                    />
                </View>
                <View style={formgroup}>
                    <Text style={label}>Password</Text>
                    <TextInput style={input}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        onChangeText={(text) => setFdata({ ...fdata, password: text })}
                        onPressIn={() => setErrormsg(null)}

                    />
                </View>
                <TouchableOpacity style={CommonClass.AddButton} onPress={onLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <Text style={link2}>Don't have an account?&nbsp;
                    <Text style={link}
                        onPress={() => navigation.navigate('signup')}
                    >
                        Create a new account
                    </Text>
                </Text>
            </View>
        </ScrollView>
    )
}

export default Login

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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
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
        height: '100%',
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
    },
    logo: {
        height: 80,
        resizeMode: 'contain',
    }
})