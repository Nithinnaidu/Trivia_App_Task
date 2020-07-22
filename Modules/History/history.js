import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Button, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import headerBackground from '../../assets/images/topBarBg.png'
import { Table, TableWrapper, Row } from 'react-native-table-component'
import { Dropdown } from 'react-native-material-dropdown'
import ToggleSwitch from 'toggle-switch-react-native'
const { width: WIDTH } = Dimensions.get('window')
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import moment from 'moment'
import { FlingGestureHandler } from 'react-native-gesture-handler'

let SQLite = require('react-native-sqlite-storage');

let db = SQLite.openDatabase({ name: "userDetails.db", location: "default", createFromLocation: '~www/userDetails.db' });
//console.disableYellowBox = true;

export default class HistoryScreenView extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "History",
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
            selectedCategory: '',
            dBdata: [],
        }
    }

    componentDidMount = async () => {
        this.getDbTransaction();
        this.getDbData();
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

    getDbData = () => {
        const tempData = []
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM userData ', [], (tx, results) => {
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    const { id, name, playername, flagColors, date_time } = row;
                    tempData.push(row)
                }
                this.setState({
                    dBdata: tempData
                })
            });
        });
    }

    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.backgroundContainer}>
                        <ScrollView>
                            <KeyboardAvoidingView>
                                {this.state.dBdata.length != 0 ?
                                    this.state.dBdata.map((dataValue, index) =>
                                        <View style={{ paddingLeft: 5 }}>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Game {index + 1} :{moment(dataValue.date_time, "DD.MM.YYYY HH:mm a").format("DD.MM.YYYY HH:mm a")}
                                            </Text>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Name:{dataValue.name}
                                            </Text>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Who is the best cricketer in the world ?
                                            </Text>
                                            <Text>
                                                Answer:{dataValue.player}
                                            </Text>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                What are the colors in the national flag ?
                                        </Text>
                                            <Text>
                                                Answer:{dataValue.flag_color}
                                            </Text>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                        </View>

                                    )
                                    :
                                    null
                                }
                            </KeyboardAvoidingView>
                        </ScrollView>
                        {/* <View style={styles.buttonContainer}>
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
                        </View> */}
                    </View>
                </SafeAreaView>
            </SafeAreaProvider >
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: 'white',
        // alignItems: 'center',
        flex: 1,
    },
    inputExpected: {
        height: 35,
        borderBottomWidth: 1,
        fontSize: 12,
        color: 'black',
    },
    textClear: {
        color: 'white',
        fontSize: 14,
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
    },
    submitDisable: {
        backgroundColor: 'grey',
        width: WIDTH - 250,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    clearButton: {
        backgroundColor: '#334ED4',
        width: WIDTH - 250,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    header: {
        height: 30,
        backgroundColor: '#334ED4'
    },
    textHeader: {
        textAlign: 'center',
        fontWeight: '100',
        color: 'white',
        fontSize: 11
    },
});