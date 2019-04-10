import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'

class map extends Component {
  state = {

  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Map' colorBar='#795548'/>
      </View>
    )
  }
}

export default map