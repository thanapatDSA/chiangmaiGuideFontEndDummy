import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Button, TextInput, HelperText, Avatar, Appbar, Card, Drawer } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class editProfile extends Component {
  state = {
    firstname: '',
    lastname: ''
  }
  editPress = (firstname, lastname) => {
    console.log(firstname, lastname)

  }
  backToProfile = () => {
    this.props.history.push('/menu', { index: 3 })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.Header style={{ backgroundColor: '#607D8B' }}>
            <Appbar.BackAction
              onPress={() => { this.backToProfile() }}
            />
            <Appbar.Content
              title="Edit Profile"
            />
          </Appbar.Header>
        </View>
        <View style={styles.bodyRegister}>
          <ScrollView>
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
            <Button style={styles.button} mode="contained" onPress={() => this.editPress(this.state.firstname, this.state.lastname)}>
              Edit
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

export default connect(null, mapDispatchToProps)(editProfile)