import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, AsyncStorage, Button } from 'react-native'
import headerBackground from '../../assets/images/topBarBg.png'
import { TextInput } from 'react-native-gesture-handler'
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const { width: WIDTH } = Dimensions.get('window')
console.disableYellowBox = true;
export default class WelcomeScreenView extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Welcome",
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
            updateName: '',
        }
    }

    callPlayersPage = async () => {
        if (this.state.updateName != '') {
            await AsyncStorage.setItem('Name', this.state.updateName)
            this.setState({
                updateName: ''
            })
            this.props.navigation.navigate('playerScreenView')
        }
        else {
            alert("Please Enter Name")
        }
    }

    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.backgroundContainer}>
                        <KeyboardAvoidingView>
                            <View style={{ justifyContent: "center", alignItems: 'center', paddingTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    What is your name?
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    returnKeyType={'next'}
                                    placeholder={"Please enter your name *"}
                                    value={this.state.updateName}
                                    onChangeText={(text) => this.setState({ updateName: text })}
                                    onSubmitEditing={() => { this.callPlayersPage() }}
                                    placeholderTextColor={'grey'}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={() => this.callPlayersPage()}
                                title="Next"
                                color="#689f38"
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        // justifyContent: "center",
        // alignItems: 'center'
    },
    inputContainer: {
        marginTop: '-2%',
        paddingTop: 20,
        alignItems: 'center'
    },
    input: {
        width: WIDTH - 55,
        borderWidth: 1,
        borderRadius: 10,
        height: 42,
        paddingLeft: 30,
        fontSize: 15,
        color: '#000000',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        fontSize: 15,
        color: '#000000',
    },
});