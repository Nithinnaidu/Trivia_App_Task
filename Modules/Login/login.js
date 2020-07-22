import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'
import headerBackground from '../../assets/images/topBarBg.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon_AntDesign from 'react-native-vector-icons/AntDesign'
const { width: WIDTH } = Dimensions.get('window')

export default class LoginScreenView extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Login",
        headerStyle: {
            backgroundColor: '#555CC4'
        },
        headerTintColor: '#fff',
        headerBackground: (
            <Image
                style={{ flex: 1, width: '100%' }}
                source={headerBackground}
                resizeMode="cover"
            />
        ),
        headerTitleStyle: {
            fontSize: 20
        }
    })

    constructor() {
        super();
        this.state = {
            mobileNumber: '',
            mobileNumberBlankError: false,
            mobileNumberInvalidDataError: false,
            mobileNumberLengthError: false,
            email: '',
            emailInvalidDataError: false,
            emailBlankError: false,
            password: '',
            passwordBlankError: false,
            passwordMinLength: false,
            showPass: true,
            pressPass: false,
            spinner: false,
        }
    }

    updateEmail = (text) => {
        this.setState({
            email: text,
            emailBlankError: false,
            emailInvalidDataError: false,
        })
    }

    updateEmailOnBlur = () => {
        // const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        /*
        const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (this.state.email == '') {
            this.setState({
                emailBlankError: true,
                emailInvalidDataError: false
            })
        } else if (reg.test(this.state.email) == true) {
            this.setState({
                emailBlankError: false,
                emailInvalidDataError: false
            })
        } else {
            this.setState({
                emailBlankError: false,
                emailInvalidDataError: true
            })
        }
        */
        if (this.state.email == '') {
            this.setState({
                emailBlankError: true,
                emailInvalidDataError: false
            })
        } else {
            this.setState({
                emailBlankError: false,
                emailInvalidDataError: false
            })
        }
        this.refs.passwordRef.focus()
    }

    updatePassword = (text) => {
        this.setState({
            password: text,
            passwordBlankError: false,
            passwordMinLength: false,
        })
    }

    updatePasswordOnBlur = () => {
        if (this.state.password == '') {
            this.setState({
                passwordBlankError: true,
                passwordMinLength: false,
            })
        } else if (this.state.password.length < 3) {
            this.setState({
                passwordMinLength: true,
                passwordBlankError: false
            })
        } else {
            this.setState({
                passwordBlankError: false,
                passwordMinLength: false,
            })
        }
    }

    showPass = () => {
        if (this.state.pressPass == false) {
            this.setState({ showPass: false, pressPass: true })
        } else {
            this.setState({ showPass: true, pressPass: false })
        }
    }

    login = () => {
        const data = []
        if (this.state.email == 'admin' && this.state.password == 'admin') {
            AsyncStorage.setItem('isLoggedIn', '1')
            this.props.navigation.navigate('dashboardScreen')
        }
    }

    render() {
        return (
            <View style={styles.backgroundContainer}>
                <KeyboardAvoidingView behavior="height">

                    {/* Username or Email */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconEmail}>
                            <Icon_AntDesign name={'user'} size={23} color={'black'} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Username'}
                            ref={'emailRef'}
                            autoFocus={true}
                            keyboardType={'email-address'}
                            value={this.state.email}
                            onChangeText={(text) => this.updateEmail(text)}
                            onBlur={() => this.updateEmailOnBlur()}
                            onSubmitEditing={() => this.refs.passwordRef.focus()}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                        />
                        {this.state.emailInvalidDataError &&
                            <Text style={{ paddingHorizontal: '3%', width: 265, color: 'red' }}> Invalid Email Format.</Text>
                        }
                        {this.state.emailBlankError &&
                            <Text style={{ paddingHorizontal: '3%', width: 265, color: 'red' }}>  Email cannot be left blank  </Text>
                        }
                    </View>

                    {/* Password */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconPassword}>
                            <Icon name={'ios-lock'} size={25} color={'black'} />
                        </View>
                        <TextInput
                            style={styles.inputPassword}
                            placeholder={'Password'}
                            ref={'passwordRef'}
                            secureTextEntry={this.state.showPass}
                            value={this.state.password}
                            onChangeText={(text) => this.updatePassword(text)}
                            onBlur={() => this.updatePasswordOnBlur()}
                            onSubmitEditing={() => this.login()}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                            maxLength={50}
                        />
                        {this.state.passwordBlankError &&
                            <Text style={{ paddingHorizontal: '3%', width: 265, color: 'red' }}>  Password cannot be left blank  </Text>
                        }
                        {this.state.passwordMinLength &&
                            <Text style={{ paddingHorizontal: '2%', width: 265, color: 'red' }}>  Minimum password length should be 3  </Text>
                        }
                        <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
                            <Icon name={this.state.pressPass == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'black'} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        {
                            this.state.macAddressSet == false ?
                                <View style={styles.deviceNotVerified}>
                                    <Text style={styles.text}>
                                        Device is not verified!
                                        </Text>
                                </View>
                                :
                                this.state.email != '' && this.state.email.length > 3 &&
                                    this.state.password != '' && this.state.password.length > 2 ?
                                    <TouchableOpacity style={styles.btnLoginSubmit} onPress={() => this.login()}>
                                        <Text style={styles.text}>
                                            LOGIN
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <View style={styles.btnLoginDisable}>
                                        <Text style={styles.text}>
                                            LOGIN
                                        </Text>
                                    </View>
                        }
                    </View>

                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1,
    },
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    inputContainer: {
        marginTop: 6,
    },
    input: {
        width: WIDTH - 55,
        height: 42,
        paddingLeft: 30,
        borderBottomWidth: 0.5,
        fontSize: 15,
        color: 'black',
    },
    inputPassword: {
        width: WIDTH - 55,
        height: 42,
        paddingLeft: 30,
        paddingRight: 30,
        borderBottomWidth: 0.5,
        fontSize: 15,
        color: 'black',
    },
    inputIconEmail: {
        position: 'absolute',
        left: 0,
        top: 8
    },
    inputIconPassword: {
        position: 'absolute',
        left: 3,
        top: 6
    },
    text: {
        color: 'white',
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
    },
    btnLoginSubmit: {
        width: WIDTH - 55,
        fontSize: 14,
        //backgroundColor: '#8D8DAA',
        backgroundColor: '#334ED4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    deviceNotVerified: {
        width: WIDTH - 55,
        fontSize: 14,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    btnLoginDisable: {
        width: WIDTH - 55,
        fontSize: 14,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    btnEye: {
        position: 'absolute',
        right: 3,
        top: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});