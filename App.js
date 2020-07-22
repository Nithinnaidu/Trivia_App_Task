import React from 'react';
import {
  Platform, StyleSheet, View, Text, Image, TouchableOpacity, Alert
} from 'react-native';
import Navigation from './Modules/Navigation/navigation';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.backgroundContainer}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    backgroundContainer: {
      flex: 1,
    },
  });