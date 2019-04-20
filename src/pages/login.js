import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { Button, TextInput, HelperText, Avatar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class login extends Component {
  state = {
    email: '',
    password: '',
    pic: 'https://puu.sh/CQUJ1/ac37c354a6.png',
  }
  loginPrass = () => {
    this.props.history.push('/menu', { index: 0 })
  }
  goToReg = () => {
    this.props.history.push('/register')
  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Login' />
        <View style={styles.body}>
          <View style={styles.avatar}>
            <Avatar.Image style={styles.avatar} size={250} source={{ uri: 'https://puu.sh/CQUJ1/ac37c354a6.png' }} />
          </View>
          <TextInput
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <HelperText
            type="error"
            visible={!this.state.email.includes('@')}
          >
            Email address is invalid!
        </HelperText>
          <TextInput
            label="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <HelperText
            type="error"
            visible={!this.state.email.includes('@')}
          >
            Password is invalid!
        </HelperText>
          <Button style={styles.button} mode="contained" onPress={() => this.loginPrass()}>
            Login
          </Button>
          <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
            <Icon name="facebook-square" size={15} solid />  Login With Facebook
          </Button>
          <Button style={styles.button} mode="contained" onPress={() => this.goToReg()}>
            Register
          </Button>
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

export default connect(null, mapDispatchToProps)(login)