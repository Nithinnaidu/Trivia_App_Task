import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Button, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'
import headerBackground from '../../assets/images/topBarBg.png'
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const { width: WIDTH } = Dimensions.get('window')
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
let SQLite = require('react-native-sqlite-storage');
import Checkbox from 'react-native-modest-checkbox';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
let db = SQLite.openDatabase({ name: "userDetails.db", location: "default", createFromLocation: '~www/userDetails.db' });
export default class FlagSelectionScreenView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Flag Color",
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
            checkbox_value: [
                {
                    "label": "White",
                    "value": "White",
                    selected: false,
                },
                {
                    "label": "Yellow",
                    "value": "Yellow",
                    selected: false,
                },
                {
                    "label": "Orange",
                    "value": "Orange",
                    selected: false,
                },
                {
                    "label": "Green",
                    "value": "Green",
                    selected: false,
                },
            ]
        }
    }

    componentDidMount = () => {
        this.getDbTransaction();
        this.callAsynData();
    }
    callAsynData = async () => {
        let username = await AsyncStorage.getItem('Name')
        let playername = await AsyncStorage.getItem('playerSelected')
        this.setState({
            userName: username,
            playername: playername,
        })
    }
    getDbTransaction = () => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='userData'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS userData', []);
                        txn.executeSql(
                            'CREATE TABLE userData (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,name	TEXT,player	TEXT,flag_color	TEXT,date_time	TEXT)',
                            []
                        );
                    }
                }
            );
        });
    }

    updateCheckedValue = (checked, grandChildIndex) => {
        let data = this.state.checkbox_value
        data[grandChildIndex].selected = checked.checked
        this.setState({
            checkbox_value: data,
        })
    }

    callSummaryPage = async () => {
        let checkboxValue = this.state.checkbox_value
        var count = checkboxValue.filter(function (s) { return s.selected; }).length;
        if (count <= 1) {
            alert('Select atleast two colors')
        }
        else {
            var flagColors;
            checkboxValue.forEach(element => {
                flagColors = checkboxValue.filter(function (s) { return s.selected && s.value });
            });
            db.transaction((tx) => {
                let result = flagColors.map(a => a.value);
                let resultSet = result.toString()
                let currentDateTime = moment().format('DD/MM/YYYY HH:mm:ss')
                tx.executeSql('INSERT INTO userData (name,player,flag_color,date_time) VALUES (?,?,?,?)',
                    [this.state.userName, this.state.playername, resultSet, currentDateTime],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            AsyncStorage.setItem('flagColors', JSON.stringify(flagColors))
                            this.props.navigation.navigate('summaryScreenView')
                        }
                    }, (error) => {
                        alert(JSON.stringify(error))
                    });
            });
        }
    }

    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.backgroundContainer} >
                        < KeyboardAvoidingView >
                            <View style={{ justifyContent: "center", alignItems: 'center', paddingTop: 20, paddingLeft: 5 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    What are the colors in the Indian national flag?
                                </Text>
                            </View>
                            {
                                this.state.checkbox_value.map((data, index) => (
                                    <View style={{ paddingTop: 10, paddingLeft: 10 }} key={index} >
                                        <Checkbox
                                            checkedComponent={<Icon_FontAwesome name="check-square-o" size={20} />}
                                            uncheckedComponent={<Icon_FontAwesome name="square-o" size={20} />}
                                            label={data.label}
                                            key={index}
                                            checked={this.state.checkbox_value[index].selected}
                                            labelStyle={{ fontSize: 18, color: '#222' }}
                                            onChange={(checked) => this.updateCheckedValue(checked, index)}
                                        />
                                        <View style={{ paddingVertical: 4 }} />
                                    </View>
                                ))
                            }
                        </KeyboardAvoidingView>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={() => this.callSummaryPage()}
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
        // alignItems: 'center',
        flex: 1,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        fontSize: 15,
        color: '#000000',
    },
});