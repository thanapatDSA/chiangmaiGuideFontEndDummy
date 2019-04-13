import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps'
import styles from '../utilities/styles'
import { Header } from '../components/header'

class map extends Component {
  state = {

  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Map' colorBar='#795548' />
        <View style={styles.bodyMap}>
          <View style={styles.mapContainer}>
            <MapView style={styles.map}
              initialRegion={{
                latitude: 13.139238380834923,
                longitude: 80.25188422300266,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }} />
          </View>
        </View>

      </View>
    )
  }
}

export default map