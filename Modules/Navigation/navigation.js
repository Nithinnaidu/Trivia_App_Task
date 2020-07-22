import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreenView from '../Welcome/welcome'
import PlayerScreenView from '../PlayerPage/playerPage'
import HistoryScreenView from '../History/history'
import FlagSelectionScreenView from '../FlagSelection/flagSelection'
import SummaryScreenView from '../SummaryScreen/summaryScreen'

const NavigationApp = createStackNavigator({
    welcomeScreen: {
        screen: WelcomeScreenView
    },
    playerScreenView: {
        screen: PlayerScreenView
    },
    historyScreenView: {
        screen: HistoryScreenView
    },
    flagSelectionScreenView: {
        screen: FlagSelectionScreenView
    },
    summaryScreenView: {
        screen: SummaryScreenView
    },
},
    {
        // initialRouteName: 'loginInScreen'
    },
)

const Navigation = createAppContainer(NavigationApp);

class NavigationView extends React.Component {
    constructor() {
        super();
        this._loadData();
    }

    _loadData = async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
        this.props.navigation.navigate("App")
    }

    render() {
        return (
            <View style={styles.backgroundContainer}>
                <ActivityIndicator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: '#F6F4EA',
        alignItems: 'center',
        flex: 1,
    }
});

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: NavigationView,
            App: Navigation,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);