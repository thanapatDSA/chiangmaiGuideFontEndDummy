import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Button, Divider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
class profile extends Component {
  state = {
    firstName: 'Thanapat',
    lastName: 'DSA',
    pic: 'https://www.orthocaremedical.com/wp-content/uploads/person-icon.png'
  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Profile' colorBar='#607D8B'/>
        <View style={styles.bodyprofilepage}>
          <Image style={{ width: 150, height: 150, borderRadius: 150 / 2, backgroundColor: '#000' }}
            source={{ uri: this.state.pic }} />
          <View style={{ width: 240, alignItems: 'center' }}>
            <Text style={styles.welcome} ><Icon name={'user'} size={25} />  {this.state.firstName}  {this.state.lastName}</Text>

            <Button onPress={() => { this.props.push('/login') }} mode="contained">Logout</Button>
          </View>
        </View>
      </View>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    push: location => {
      dispatch(push(location))
    }
  }
}


export default connect(null, mapDispatchToProps)(profile)