import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    AsyncStorage,
    KeyboardAvoidingView,
    Button,
} from 'react-native'
import headerBackground from '../../assets/images/topBarBg.png'
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const { width: WIDTH } = Dimensions.get('window')
export default class PlayerScreenView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Select Player",
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
            value: 0,
            label: '',
            radio_props: [
                { label: 'Sachin Tendulkar', value: 0 },
                { label: 'Virat Kolli', value: 1 },
                { label: 'Adam Gilchirst', value: 2 },
                { label: 'Jacques Kallis', value: 3 },
            ],
        }
    }

    setRadiovalue = (value) => {
        this.setState({ value: value })
        if (value == 0) {
            this.setState({ label: 'Sachin Tendulkar' })
        }
        if (value == 1) {
            this.setState({
                label: 'Virat Kolli',
            })
        }
        if (value == 2) {
            this.setState({
                label: 'Adam Gilchirst',
            })
        }
        if (value == 3) {
            this.setState({
                label: 'Jacques Kallis',
            })
        }
    }

    callFlagPage = async () => {
        if (this.state.label != '') {
            await AsyncStorage.setItem('playerSelected', this.state.label)
            this.props.navigation.navigate('flagSelectionScreenView')
        }
        else {
            let playerName = 'Sachin Tendulkar'
            await AsyncStorage.setItem('playerSelected', playerName)
            this.props.navigation.navigate('flagSelectionScreenView')
        }
    }

    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.backgroundContainer} >
                        < KeyboardAvoidingView >
                            <View style={{ justifyContent: "center", alignItems: 'center', paddingTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    Who is the best cricketer in the world?
                                </Text>
                            </View>
                            <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                                <RadioForm
                                    radio_props={this.state.radio_props}
                                    initial={0}
                                    onPress={(value) => { this.setRadiovalue(value) }}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={() => this.callFlagPage()}
                                title="Next"
                                color="#689f38"
                            />
                        </View>
                    </View >
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: 'white',
        flex: 1,
        marginBottom: 10
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        fontSize: 15,
        color: '#000000',
    },
    input: {
        width: WIDTH - 55,
        height: 42,
        paddingLeft: 30,
        borderBottomWidth: 0.5,
        fontSize: 15,
        color: 'black',
    },
    header: {
        height: 30,
        backgroundColor: '#334ED4'
    },
});