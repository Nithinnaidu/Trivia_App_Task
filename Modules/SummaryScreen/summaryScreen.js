import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Dimensions,
    Button,
    AsyncStorage
} from 'react-native'
import headerBackground from '../../assets/images/topBarBg.png'
const { width: WIDTH } = Dimensions.get('window')
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
let SQLite = require('react-native-sqlite-storage');
export default class SummaryScreenView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Summary",
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
        }
    }

    componentDidMount = () => {
        this.callAsynData()
    }
    callAsynData = async () => {
        let username = await AsyncStorage.getItem('Name')
        let playername = await AsyncStorage.getItem('playerSelected')
        let flagColors = await AsyncStorage.getItem('flagColors')
        let flagValue = JSON.parse(flagColors)
        let result = flagValue.map(a => a.value);
        let resultSet = result.toString()
        this.setState({
            userName: username,
            playername: playername,
            flagColors: resultSet,
        })
    }

    callRestartPage = () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('welcomeScreen')
    }

    callHistoryPage = () => {
        this.props.navigation.navigate('historyScreenView')
    }

    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.backgroundContainer}>
                        <KeyboardAvoidingView>
                            <View style={{ justifyContent: "center", alignItems: 'center', paddingTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    Hello {this.state.userName}
                                </Text>
                            </View>
                            <View>
                                <View style={{ fontSize: 22, paddingTop: 10, paddingLeft: 5, padding: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        Here are the answers selected:
                                    </Text>
                                </View>
                                <View style={{ fontSize: 22, paddingLeft: 5, padding: 10 }}>
                                    <Text>
                                        Who is the best cricketer in the world ?
                                    </Text>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        Answer: {this.state.playername}
                                    </Text>
                                </View>
                                <View style={{ fontSize: 22, paddingLeft: 5, padding: 10 }}>
                                    <Text>
                                        What are the colors in the national flag ?
                                    </Text>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        Answer: {this.state.flagColors}
                                    </Text>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={() => this.callRestartPage()}
                                title="FINISH"
                                color="#689f38"
                            />
                            <View style={{ padding: 10 }} />
                            <Button
                                onPress={() => this.callHistoryPage()}
                                title="HISTORY"
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
        backgroundColor: 'white',
        // alignItems: 'center',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        fontSize: 15,
        color: '#000000',
    },
});