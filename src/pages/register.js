import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Button, TextInput, HelperText, Avatar, Appbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class register extends Component {
  state = {
    email: '',
    password: '',
    confrimPassword: '',
    firstname: '',
    lastname: ''
  }
  goTologin = () => {
    this.props.history.push('/login')
  }
  registerPress = (email, password, firstname, lastname) => {
    console.log('====================================');
    console.log("Register Press", email, password, firstname, lastname);
    console.log('====================================');
    this.props.history.push('/login')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => { this.goTologin() }}
            />
            <Appbar.Content
              title="Register"
            />
          </Appbar.Header>
        </View>
        <View style={styles.bodyRegister}>
          <ScrollView>
            <TextInput
              mode="outlined"
              error={!this.state.email.includes('@')}
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })} />
            <HelperText
              type="error"
              visible={!this.state.email.includes('@')} >
              Email address is not includes @
          </HelperText>
            <TextInput
              mode="outlined"
              label="First name"
              value={this.state.firstname}
              onChangeText={firstname => this.setState({ firstname })} />
            <HelperText>
            </HelperText>
            <TextInput
              mode="outlined"
              label="Last name"
              value={this.state.lastname}
              onChangeText={lastname => this.setState({ lastname })} />
            <HelperText>
            </HelperText>
            <TextInput
              secureTextEntry
              mode="outlined"
              error={false}
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })} />
            <HelperText>
            </HelperText>
            <TextInput
              error={this.state.password !== this.state.confrimPassword}
              secureTextEntry
              mode="outlined"
              label="Confrim Password"
              value={this.state.confrimPassword}
              onChangeText={confrimPassword => this.setState({ confrimPassword })} />
            <HelperText
              type="error"
              visible={this.state.password !== this.state.confrimPassword}>
              Password is not match
            </HelperText>
            <Button style={styles.button} mode="contained" onPress={() => this.registerPress(this.state.email, this.state.password, this.state.firstname, this.state.lastname)}>
              Register
            </Button>
          </ScrollView>
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

export default connect(null, mapDispatchToProps)(register)