import React, { Component } from 'react'
import { Image, StyleSheet, YellowBox, View, Alert, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { Button, TextInput, HelperText, Avatar, Appbar, Snackbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import axios from 'axios'

YellowBox.ignoreWarnings(['Setting a timer']);

class login extends Component {
  state = {
    email: 'in-in@hotmail.com',
    password: '25666',
    pic: 'https://puu.sh/CQUJ1/ac37c354a6.png',
    visible: false,
  }

  UNSAFE_componentWillMount() {
    const { profile, ipreducer } = this.props
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
  }

  loginPrass = () => {
    console.log('TEST login press');
    const { ipreducer } = this.props
    axios({
      method: 'post',
      url: `${this.props.ipreducer.ip}/auth`,
      data: {
        username: this.state.email,
        password: this.state.password
      }
    })
      .then((res) => {
        this.props.addProfile(res.data.user.id, res.data.user.email, res.data.user.firstName, res.data.user.lastName, res.data.token);
        this.props.history.push('/menu', { index: 1 })

        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  loginPrassTest = () => {
    this.setState(state => ({ visible: !state.visible }))
    // this.props.addProfile("a@b.com", "a", "b", "hatoken");
    // this.props.history.push('/menu', { index: 0 })
  }
  goToReg = () => {
    this.props.history.push('/register')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.Header >
            <Appbar.BackAction
              onPress={() => { this.props.history.push('/menu', { index: 0 }) }}
            />
            <Appbar.Content
              title="Login"
            />
          </Appbar.Header>
        </View>
        <View style={styles.body}>
          <View style={styles.avatar}>
            <Avatar.Image style={styles.avatar} size={200} source={{ uri: 'https://puu.sh/CQUJ1/ac37c354a6.png' }} />
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
          <Button style={styles.button} mode="contained" onPress={() => {

            console.log('TEST');
            this.loginPrass()
          }}>
            Login
          </Button>
          <Button style={styles.button} mode="contained" onPress={() => this.loginPrassTest()}>
            <Icon name="facebook-square" size={15} solid />  Login With Facebook
          </Button>
          <Button style={styles.button} mode="contained" onPress={() => this.goToReg()}>
            Register
          </Button>
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            duration={Snackbar.DURATION_LONG}
            action={{
              label: 'Undo',
              onPress: () => {
                // Do something
              },
            }}
          >
            Hey there! I'm a Snackbar.
        </Snackbar>
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    ipreducer: state.ipreducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProfile: (id, email, firstname, lastname, token) => {
      dispatch({
        type: 'ADD_PROFILE',
        id: id,
        email: email,
        firstname: firstname,
        lastname: lastname,
        token: token
      })
    },
    push: location => {
      dispatch(push(location))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(login)