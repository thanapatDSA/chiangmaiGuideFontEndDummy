import React, { Component } from 'react'
import styles from '../utilities/styles'
import { Image, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { Appbar } from 'react-native-paper';

export const Header = ({ textHeader,colorBar }) => {
  return (
    <View style={styles.header}>
      <Appbar.Header style={{backgroundColor: colorBar}}>
        <Appbar.Content
          title={textHeader}
        />
      </Appbar.Header>
    </View>
  )
}


export default connect(null, { push })(Component)
