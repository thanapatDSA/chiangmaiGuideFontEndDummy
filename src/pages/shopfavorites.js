import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'

class shopfavorites extends Component {
  state = {

  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Favorites' colorBar='#009688'/>
      </View>
    )
  }
}

export default shopfavorites